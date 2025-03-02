import { createClient } from 'redis'
import { logger } from './logger'

export const redis = createClient({
  url: process.env.CACHE_URL
})

redis.on('error', err => logger.error('Redis Client Error:', err))