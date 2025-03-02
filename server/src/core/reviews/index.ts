import Review from "../../adapters/repository/Review"
import { ReviewDto } from "./dto"

class ReviewService {
  async getAll(): Promise<Array<ReviewDto>> {
    const reviews = await Review.findAll()

    return reviews
  }
}

export default new ReviewService()