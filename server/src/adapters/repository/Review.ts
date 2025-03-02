import { prisma } from "../../libs/prisma"

class Review {
  async findAll() {
    return prisma.review.findMany()
  }
}

export default new Review()