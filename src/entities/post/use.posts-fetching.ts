import { PostsModel, PostsSchema } from 'src/entities/post/posts.model'

import { useFetch, UseFetchProps } from '@shared/lib/fetch'

export const usePostsFetching = (): {
  hasPostsError: boolean
  isPostsLoading: boolean
  posts: PostsModel | null
} => {
  const useFetchProps: UseFetchProps = {
    schema: PostsSchema,
    url: 'https://jsonplaceholder.typicode.com/posts',
  }

  const {
    data: posts,
    isLoading: isPostsLoading,
    hasError: hasPostsError,
  } = useFetch<PostsModel>(useFetchProps)

  return { hasPostsError, isPostsLoading, posts }
}
