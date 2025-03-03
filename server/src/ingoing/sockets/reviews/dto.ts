import { z } from 'zod'

const checkAvailableFile = (filename: string) => {
  return filename.endsWith('.jpg') || filename.endsWith('.png') || filename.endsWith('.jpeg') || filename.endsWith('.svg')
}

export const createReviewSchema = z.strictObject({
  username: z.string(),
  text: z.string(),
  rating: z.number().max(5).min(1),
  image: z.strictObject({
    buffer: z.any().refine(Buffer.isBuffer, { message: 'expected buffer' }),
    filename: z.string().refine(checkAvailableFile, { message: 'not avalible file format' })
  })
})

export type createReviewDto = z.infer<typeof createReviewSchema>

export const updateReviewSchema = z.object({
  id: z.string(),
  username: z.string().optional(),
  text: z.string().optional(),
  rating: z.number().max(5).min(1).optional(),
  image: z.strictObject({
    buffer: z.any().refine(Buffer.isBuffer, { message: 'expected buffer' }),
    filename: z.string().refine(checkAvailableFile, { message: 'not avalible file format' })
  }).optional()
})

export type updateReviewDto = z.infer<typeof updateReviewSchema>

export const swapReviewSchema = z.array(z.string()).length(2)

export type swapReviewDto = z.infer<typeof swapReviewSchema>

export const deleteReviewSchema = z.string()

export type deleteReviewDto = z.infer<typeof deleteReviewSchema>

export type ReviewEventsDto = createReviewDto | updateReviewDto | swapReviewDto | deleteReviewDto