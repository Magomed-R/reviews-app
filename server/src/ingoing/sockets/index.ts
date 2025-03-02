import { Socket } from 'socket.io'
import { bindReviewSocket } from './reviews'

export const handleEvents = (socket: Socket) => {
  bindReviewSocket(socket)
}
