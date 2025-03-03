import storage from '../../adapters/gateway/storage'
import Review from '../../adapters/repository/Review'
import { NotFoundError } from '../errors'
import { CreateReviewDto, DeleteReviewDto, ReviewDto, SwapReviewDto, UpdateReviewDto } from './dto'

interface ReviewService {
  getAll(): Promise<Array<ReviewDto>>
  create(review: CreateReviewDto): Promise<ReviewDto>
  update(review: UpdateReviewDto): Promise<ReviewDto>
  swap(review: SwapReviewDto): Promise<[ReviewDto, ReviewDto]>
  delete(reviewId: DeleteReviewDto): Promise<ReviewDto>
}

class ReviewService {
  async getAll() {
    const reviews = await Review.findAll()

    return reviews
  }

  async create({ username, text, rating, image }: CreateReviewDto) {
    const { url } = await storage.put(image)

    const newReview = await Review.create({ username, text, rating, image_url: url })

    return newReview
  }

  async update({ id, image, rating, text, username }: UpdateReviewDto) {
    const current = await Review.findById(id)

    if (!current)
      throw new NotFoundError({
        code: 'REVIEW_NOT_FOUND',
        data: { id }
      })

    const updateParams: Parameters<typeof Review.put>[0] = {
      id,
      text: text ?? current.text,
      username: username ?? current.username,
      rating: rating ?? current.rating,
      image_url: current.image_url
    }

    if (image) {
      const { url } = await storage.put(image)
      updateParams.image_url = url
    }

    const updatedReview = await Review.put(updateParams)

    return updatedReview
  }

  async swap([firstId, secondId]: SwapReviewDto) {
    const updatedReviews = await Review.swap(firstId, secondId)

    if (!updatedReviews)
      throw new NotFoundError({
        code: 'REVIEWS_NOT_FOUND',
        data: { reviews: [firstId, secondId] }
      })

    return updatedReviews
  }

  async delete(reviewId: DeleteReviewDto): Promise<ReviewDto> {
    const deletedReview = await Review.deleteById(reviewId)

    if (!deletedReview)
      throw new NotFoundError({
        code: 'REVIEW_NOT_FOUND',
        data: { id: reviewId }
      })

    return deletedReview
  }
}

export default new ReviewService()
