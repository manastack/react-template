import { z } from 'zod'

export const PostsSchema = z.array(
  z.object({
    body: z.string(),
    id: z.number(),
    title: z.string(),
    userId: z.number(),
  }),
)

export type PostsModel = z.infer<typeof PostsSchema>
