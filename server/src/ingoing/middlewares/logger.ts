import { NextFunction, Request, Response } from 'express'
import { logger } from '../../libs/logger'
import { Event } from 'socket.io'

export const httpLoggerMiddleware = (req: Request, res: Response, next: NextFunction) => {
  logger.info(`[http] ${req.url} ${new Date()}`)
  next()
}

export const socketLoggerMiddleware = (event: Event, next: (err?: Error) => void) => {
  logger.info(`[socket] ${event[0]} (${new Date()})`)
  next()
}
