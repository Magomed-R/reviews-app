import { Socket } from "socket.io"

export const bindReviewSocket = (socket: Socket) => {
  socket.on('review:create', (data) => {
    socket.send('ok')
  })
}

