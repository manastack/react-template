import { useFetch } from '@shared/lib/fetch'
import { PostsItem } from './post.model'

export const usePostsFetching = (): {
  hasPostsError: boolean
  isPostsLoading: boolean
  posts: PostsItem[] | null
} => {
  const {
    data: posts,
    isLoading: isPostsLoading,
    hasError: hasPostsError,
  } = useFetch<PostsItem[] | null>('https://jsonplaceholder.typicode.com/posts')

  return { hasPostsError, isPostsLoading, posts }
}
