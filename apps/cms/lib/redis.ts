import Redis from "ioredis"

const globalForRedis = global as  {redisClient?:Redis };

export const redis = globalForRedis?.redisClient || new Redis(process.env.REDIS_URL!)

if(process.env.NODE_ENV != "production"){
    globalForRedis.redisClient = redis 
}



