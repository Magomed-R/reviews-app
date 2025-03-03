import { Review as IReview } from '@prisma/client'
import { prisma } from '../../libs/prisma'
import { redis } from '../../libs/redis'

interface Review {
  findAll(): Promise<Array<IReview>>
  findById(id: string): Promise<IReview | null>
  create(review: Omit<IReview, 'id' | 'created_at'>): Promise<IReview>
  swap(firstId: string, secondId: string): Promise<[IReview, IReview]>
  put(review: Omit<IReview, 'created_at'>): Promise<IReview | null>
  deleteById(reviewId: string): Promise<IReview | null>
}

class Review {
  async findAll() {
    const cachedReviews = (await redis.json.get('reviews:all')) as Array<IReview> | null

    if (cachedReviews) return cachedReviews

    const reviews = await prisma.review.findMany()

    await redis.json.set('reviews:all', '$', reviews)

    return reviews
  }

  async findById(id: string) {
    const cachedReview = (await redis.json.get(`reviews:${id}`)) as IReview | null

    if (cachedReview) return cachedReview

    const review = await prisma.review.findUnique({ where: { id } })

    if (review) await redis.json.set(`reviews:${id}`, '$', review)

    return review
  }

  async create(review: Omit<IReview, 'id' | 'created_at' | 'order'>) {
    const newReview = await prisma.review.create({ data: review })

    await redis.json.del('reviews:all')
    await redis.json.set(`reviews:${newReview.id}`, '$', newReview)

    return newReview
  }

  async put(review: Omit<IReview, 'created_at' | 'order'>) {
    const exists = !!(await this.findById(review.id))

    if (!exists) return null

    const updatedReview = await prisma.review.update({ where: { id: review.id }, data: review })

    await redis.json.del('reviews:all')
    await redis.json.set(`reviews:${review.id}`, '$', updatedReview)

    return updatedReview
  }

  async swap(firstId: string, secondId: string) {
    const [first, second] = await Promise.all([this.findById(firstId), this.findById(secondId)])

    if (!first || !second) return null

    const [updatedFirst, updatedSecond] = await Promise.all([
      prisma.review.update({ where: { id: firstId }, data: { order: second.order } }),
      prisma.review.update({ where: { id: secondId }, data: { order: first.order } })
    ])

    await redis.json.del('reviews:all')
    await redis.json.set(`reviews:${firstId}`, '$', updatedFirst)
    await redis.json.set(`reviews:${secondId}`, '$', updatedSecond)

    return [updatedFirst, updatedSecond]
  }

  async deleteById(id: string) {
    const exists = !!(await this.findById(id))

    if (!exists) return null

    const deletedReview = await prisma.review.delete({ where: { id } })

    await redis.json.del('reviews:all')
    await redis.json.del(`reviews:${id}`)

    return deletedReview
  }
}

export default new Review()
