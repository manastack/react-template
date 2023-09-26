import { z } from 'zod'

const PostsItemDtoSchema = z.object({
  body: z.string(),
  id: z.number(),
  title: z.string(),
  userId: z.number(),
})

const PostsItemModelSchema = PostsItemDtoSchema.transform(
  ({ title, ...restFields }) => ({
    name: title,
    ...restFields,
  }),
)

export type PostsItemDto = z.infer<typeof PostsItemDtoSchema>

export type PostsItemModel = z.infer<typeof PostsItemModelSchema>

export const PostsModelSchema = z.array(PostsItemModelSchema)

export type PostsModel = z.infer<typeof PostsModelSchema>
