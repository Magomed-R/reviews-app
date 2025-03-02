import { Router } from "express"
import { reviewRouter } from "./reviews"

export const v1Router = Router()

v1Router.use('/reviews', reviewRouter)

