import { Request, Response, Router } from 'express'
import ReviewService from '../../../core/reviews'
import { createRouteHandler } from '../routeHandler'

export const reviewRouter = Router()

reviewRouter.get('/', createRouteHandler(async (req: Request, res: Response) => {
  const reviews = await ReviewService.getAll()

  res.json(reviews)
}))
