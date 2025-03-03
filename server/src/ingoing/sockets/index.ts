import { Server, Socket } from 'socket.io'
import { bindReviewSocket } from './reviews'

export const handleEvents = (socket: Socket, io: Server) => {
  bindReviewSocket(socket, io)
}
