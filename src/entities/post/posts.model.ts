import { z } from 'zod'

export const PostsItemSchema = z.object({
  body: z.string(),
  id: z.number(),
  title: z.string(),
  userId: z.number(),
})

export type PostsItemModel = z.infer<typeof PostsItemSchema>

export const PostsSchema = z.array(PostsItemSchema)

export type PostsModel = z.infer<typeof PostsSchema>
