import { Socket } from 'socket.io'
import { logger } from '../../libs/logger'
import { BaseError } from '../../core/errors'

export const createSocketHandler = <T>(handler: (review: T) => Promise<void | boolean>, socket: Socket) => {
  return async (review: T) => {
    try {
      return await handler(review)
    } catch (error) {
      logger.error(error)

      if (error instanceof BaseError) return socket.emit('error', { code: error.code, message: error.message, data: error.data })
      return socket.emit('error', JSON.stringify(error))
    }
  }
}
