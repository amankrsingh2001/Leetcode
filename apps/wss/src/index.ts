
import dotenv from "dotenv";
dotenv.config();

import { WebSocket, WebSocketServer } from "ws";
import url from "url";
import { redis } from "./redis";
import { runQueue, runQueueEvents, submitQueueEvent } from "./queue/runQueue";
import "./workers/worker"



interface AuthenticatedWebSocket extends WebSocket {
  userId?: string;
}

const wss = new WebSocketServer({ port: 8080 });

console.log(process.env.REDIS_URL!)


wss.on("connection", async (ws: AuthenticatedWebSocket, request) => {
  try {
    const { ticket } = url.parse(request.url || "", true).query;
    console.log(request.url);
    if (!ticket || Array.isArray(ticket)) {
      console.warn(
        "Connection rejected: Missing or malformed ticket parameter",
      );
      ws.close(4001, "Authentication ticket missing");
      return;
    }

    const userId = await redis.get(`ws_ticket:${ticket}`);
    if (!userId) {
      console.warn(
        "Connection rejected: Ticket ${ticket} is invalid or expired",
      );
      ws.close(4003, "Invalid or expired ticket");
      return;
    }
// Delete the ticket immedialtely if the ticket is true and present in the redis
    // const deleteTicket = await redis.del(`ws_ticket:${ticket}`);
    // console.log(deleteTicket)

    ws.userId = userId;
    console.log(`[WS connected] User ${ws.userId} successfully authenticated `);

    ws.on("message", async(rawData) => {
      try {


        const messageString = rawData.toString();
        const parseData = JSON.parse(messageString);

        console.log(`[WS MESSAGE] From ${ws.userId}:`);
        if (parseData.message === "ping") {
          ws.send(JSON.stringify({ message: "PONG" }));
        }


        switch (parseData.type) {
          case 'RUN_CODE':
            const {problemId, language, code, testCase} = parseData.payload;

           const runJob =  await runQueue.add("run-code",{
              userId:ws.userId,
              ...parseData.payload,
            })

            const result = await runJob.waitUntilFinished(runQueueEvents);

            ws.send(
              JSON.stringify({
                type: "RUN_RESULT",
                payload: result,
              })
            );
          break;

          case "SUBMIT_CODE":

          const submitJob = await runQueue.add("submit-code",{
            userId:ws.userId,
            ...parseData.payload
          })
           const submitResult = await submitJob.waitUntilFinished(submitQueueEvent);
           ws.send(
              JSON.stringify({
                type: "SUBMIT_RESULT",
                payload: result,
              })
            );
          break;

          break;
          default:
            break;
        }
      } catch (messageError) {
        console.error(
          `[WS ERROR] Failed to process message frame from user ${ws.userId}:`,
          messageError,
        );
        // Do not crash, just send an error payload back to the culprit client if needed
        ws.send(
          JSON.stringify({ error: "Invalid data format. Expected JSON." }),
        );
      }
    });

    ws.on("error", (socketError) => {
      console.error(
        `[WS CLIENT CRASH] Runtime exception on socket for user ${ws.userId}:`,
        socketError,
      );
    });
    ws.on("close", (code, reason) => {
      try {
        console.log(
          `[WS CLOSE] User ${ws.userId} disconnected. Code: ${code}, Reason: ${reason.toString() || "None"}`,
        );
        // Handle game-specific cleanups here (e.g., removing them from an active match lobby)
      } catch (closeError) {
        console.error(
          `[WS ERROR] Exception during close cleanup for user ${ws.userId}:`,
          closeError,
        );
      }
    });
  } catch (globalConnectionError) {
    // Catch-all guard: If anything at all fails above, cleanly reject this one connection
    console.error(
      "Critical Exception caught during WebSocket handshake protocol:",
      globalConnectionError,
    );

    try {
      // Safely attempt to close the socket connection so it doesn't hang open in limbo
      if (
        ws.readyState === WebSocket.OPEN ||
        ws.readyState === WebSocket.CONNECTING
      ) {
        ws.close(1011, "Internal Server Error during handshake");
      }
    } catch (closeFailure) {
      console.error(
        "Failed to cleanly terminate faulty socket connection:",
        closeFailure,
      );
    }
  }
});

// Optional: Global process-level safety nets to catch completely unhandled edge cases
process.on("unhandledRejection", (reason, promise) => {
  console.error(
    "Unhandled Promise Rejection detected at:",
    promise,
    "reason:",
    reason,
  );
});

process.on("uncaughtException", (error) => {
  console.error(
    "CRITICAL: Uncaught Exception intercepted to prevent system crash:",
    error,
  );
});
