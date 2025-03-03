import { type Review } from '@prisma/client'

export type ReviewDto = Review

export type CreateReviewDto = Pick<ReviewDto, 'username' | 'text' | 'rating'> & {
  image: {
    filename: string
    buffer: Buffer
  }
}

export type UpdateReviewDto = Partial<
  Omit<ReviewDto, 'image_url' | 'order' | 'created_at'> & {
    image: {
      filename: string
      buffer: Buffer
    }
  }
> & { id: string }

export type SwapReviewDto = [string, string]

export type DeleteReviewDto = string
