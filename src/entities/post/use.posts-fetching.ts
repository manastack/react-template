import { useFetch } from '@shared/lib/fetch'
import { PostsItemDto, PostsItemModel } from './post.model'

export const usePostsFetching = (): {
  hasPostsError: boolean
  isPostsLoading: boolean
  posts: PostsItemModel[] | null
} => {
  const {
    data: posts,
    isLoading: isPostsLoading,
    hasError: hasPostsError,
  } = useFetch<PostsItemDto[], PostsItemModel[]>({
    url: 'https://jsonplaceholder.typicode.com/posts',
  })

  return { hasPostsError, isPostsLoading, posts }
}
