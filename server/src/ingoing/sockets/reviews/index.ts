import { Server, Socket } from 'socket.io'
import { createReviewSchema, deleteReviewSchema, swapReviewSchema, updateReviewSchema } from './dto'
import ReviewService from '../../../core/reviews'
import { EmitEvents, ListenEvents} from './events'
import { createSocketHandler } from '../socketHandler'

export const bindReviewSocket = (socket: Socket<ListenEvents, EmitEvents>, io: Server) => {
  socket.on('review:create', createSocketHandler(async (review) => {
    const { success, error } = createReviewSchema.safeParse(review)

    if (!success) return socket.emit('error', error.issues)

    const newReview = await ReviewService.create(review)

    io.emit('review:created', newReview)
  }, socket))

  socket.on('review:update', createSocketHandler(async (review) => {
    const { success, error } = updateReviewSchema.safeParse(review)

    if (!success) return socket.emit('error', error.issues)
    
    const updatedReview = await ReviewService.update(review)

    io.emit('review:updated', updatedReview)
  }, socket))

  socket.on('review:swap', createSocketHandler(async (reviewIds) => {
    const { success, error } = swapReviewSchema.safeParse(reviewIds)

    if (!success) return socket.emit('error', error.issues)
    
    const updatedReviews = await ReviewService.swap([ reviewIds[0], reviewIds[1] ])
      
    io.emit('review:swaped', updatedReviews)
  }, socket))

  socket.on('review:delete', createSocketHandler(async (reviewId) => {
    const { success, error } = deleteReviewSchema.safeParse(reviewId)

    if (!success) return socket.emit('error', error.issues)
    
    const deletedReview = await ReviewService.delete(reviewId)

    io.emit('review:deleted', deletedReview)
  }, socket))
}
