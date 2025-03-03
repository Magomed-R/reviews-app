import { createReviewDto, deleteReviewDto, swapReviewDto, updateReviewDto } from './dto'

export interface ListenEvents {
  'review:create': (review: createReviewDto) => Promise<void | boolean>
  'review:update': (review: updateReviewDto) => Promise<void | boolean>
  'review:swap': (review: swapReviewDto) => Promise<void | boolean>
  'review:delete': (review: deleteReviewDto) => Promise<void | boolean>
}

type EmitEventNames = 'error' | 'review:created' | 'review:updated' | 'review:swaped' | 'review:deleted' 

export type EmitEvents = {
  [key in EmitEventNames]: any
}
