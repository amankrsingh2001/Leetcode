import Redis from "ioredis"

const globalForRedis = globalThis as typeof globalThis & {
    redis?: Redis;
}

export const redis = globalForRedis.redis?? new Redis(process.env.REDIS_URL!,{
    maxRetriesPerRequest:null
})

if(process.env.NODE_ENV !== "production"){
    globalForRedis.redis = redis;
}
