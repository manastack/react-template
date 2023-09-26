import { ApiItemConfig } from '@shared/lib/api'

type QueryKey = 'postsReading' | 'postUpdating'

export const apiConfig: Record<QueryKey, ApiItemConfig> = {
  postUpdating: {
    getUrl: (id) => `https://jsonplaceholder.typicode.com/posts/${id}`,
    messageGetterDict: {
      error: (details) =>
        `Error while updating post${details ? `: ${details}` : ''}`,

      loading: () => 'Updating post...',
      success: () => 'Post updated successfully',
    },
    mock: {
      enabled: false,
      loader: () => import('../../entities/post/posts.mock'),
    },
  },

  postsReading: {
    getUrl: () => 'https://jsonplaceholder.typicode.com/posts',
    messageGetterDict: {
      error: (details) =>
        `Error while fetching posts${details ? `: ${details}` : ''}`,

      loading: () => 'Fetching posts...',
      success: () => 'Posts fetched successfully',
    },
    mock: {
      enabled: false,
      loader: () => import('../../entities/post/posts.mock'),
    },
  },
}
