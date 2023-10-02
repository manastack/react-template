import { z } from 'zod'

// postsReading schemas:

export const PostsItemReadingDtoSchema = z.object({
  body: z.string(),
  id: z.number(),
  title: z.string(),
  userId: z.number(),
})

export const PostsItemReadingModelSchema = PostsItemReadingDtoSchema.transform(
  ({ title, ...restFields }) => ({
    name: title,
    ...restFields,
  }),
)

export const PostsReadingDtoSchema = z.array(PostsItemReadingDtoSchema)

export const PostsReadingModelSchema = z.array(PostsItemReadingModelSchema)

// postsReading types:

export type PostsItemReadingDto = z.infer<typeof PostsItemReadingDtoSchema>
export type PostsReadingDto = z.infer<typeof PostsReadingDtoSchema>
export type PostsItemReadingModel = z.infer<typeof PostsItemReadingModelSchema>
export type PostsReadingModel = z.infer<typeof PostsReadingModelSchema>

// postUpdating schemas:

// todo - reuse form schema:
export const PostUpdatingModelSchema = z.object({
  body: z.string(),
  id: z.number(),
  name: z.string(),
  userId: z.number(),
})

export const PostUpdatingDtoSchema = PostUpdatingModelSchema.transform(
  ({ name, ...restFields }) => ({
    title: name,
    ...restFields,
  }),
)

// postsUpdating types:

export type PostUpdatingModel = z.infer<typeof PostUpdatingModelSchema>
export type PostUpdatingDto = z.infer<typeof PostUpdatingDtoSchema>
