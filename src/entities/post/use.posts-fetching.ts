import { apiConfig } from '@app/config'
import { PostsModel, PostsSchema } from '@entities/post/posts.model'
import { useFetch, UseFetchProps } from '@shared/lib/api'

export const usePostsFetching = (): {
  hasPostsError: boolean
  isPostsLoading: boolean
  posts: PostsModel | null
} => {
  const useFetchProps: UseFetchProps = {
    customMockEnabled: apiConfig.postsReading.mock?.enabled,
    schema: PostsSchema,
    url: apiConfig.postsReading.getUrl(),
  }

  const {
    data: posts,
    isLoading: isPostsLoading,
    hasError: hasPostsError,
  } = useFetch<PostsModel>(useFetchProps)

  return { hasPostsError, isPostsLoading, posts }
}
