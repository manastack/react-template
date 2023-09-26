import { apiConfig } from '@app/config'
import { PostsModel, PostsSchema } from '@entities/post/posts.model'
import { useFetching, UseFetchingProps } from '@shared/lib/api'

export const usePostsFetching = (): {
  hasPostsError: boolean
  isPostsLoading: boolean
  posts: PostsModel | null
} => {
  const props: UseFetchingProps = {
    customMockEnabled: apiConfig.postsReading.mock?.enabled,
    id: 'postsReading',
    messageGetterDict: apiConfig.postsReading.messageGetterDict,
    schema: PostsSchema,
    url: apiConfig.postsReading.getUrl(),
  }

  const {
    data: posts = null,
    isLoading: isPostsLoading,
    isError: hasPostsError,
  } = useFetching<PostsModel>(props)

  return { hasPostsError, isPostsLoading, posts }
}
