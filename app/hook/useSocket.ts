"use client";

import { api } from "@/lib/api";
import { useEffect, useState } from "react";

// 1. Define the interface for your API response structure
interface WsTicketResponse {
  success: boolean;
  ticket: string; // Tells TS that 'ticket' exists on the returned object
}

export function useSocket() {
  const [loadingState, setLoadingState] = useState(true);
  const [socket, setSocket] = useState<WebSocket | null>(null);

  useEffect(() => {
    let ws: WebSocket;

    async function connect() {
      try {
        // 2. Pass the interface as a generic type argument <WsTicketResponse>
        const data = await api.post<WsTicketResponse>('/ws-ticket');
        
        // If your interceptor returns response.data directly:
        const ticket = data.data.ticket; 
        
        // If your interceptor does NOT extract data automatically, use:
        // const ticket = data.data.ticket;

        if (!ticket) {
          throw new Error("Failed to get WS ticket");
        }

        console.log(ticket, 'This is the token we are getting');

        // WebSocket connect
        ws = new WebSocket(
          `${process.env.NEXT_PUBLIC_WS_URL}?token=${ticket}`
        );

        ws.onopen = () => {
          console.log("WebSocket Connected");
          setLoadingState(false);
          setSocket(ws);
        };

        ws.onmessage = (event) => {
          console.log(JSON.parse(event.data));
        };

        ws.onerror = (err) => {
          console.error(err);
        };

        ws.onclose = () => {
          console.log("WebSocket Closed");
        };
      } catch (err) {
        console.error(err);
        setLoadingState(false);
      }
    }

    connect();

    return () => {
      ws?.close();
    };
  }, []);

  return {
    socket,
    loadingState,
  };
}