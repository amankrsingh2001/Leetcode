import { Queue, QueueEvents } from "bullmq";
import { redis } from "../redis";



export const runQueue = new Queue("run-code",{
    connection:redis
})

export const runQueueEvents = new QueueEvents('run-code',{
    connection:redis
})

export const submitQueue = new Queue("submit-code",{
    connection:redis
})

export const submitQueueEvent = new  QueueEvents("submit-code",{
    connection:redis
})

runQueueEvents.waitUntilReady().catch(console.error)
submitQueueEvent.waitUntilReady().catch(console.error)