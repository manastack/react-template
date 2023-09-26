import { ApiItemConfig } from '@shared/lib/api'

type QueryKey = 'postsReading'

export const apiConfig: Record<QueryKey, ApiItemConfig> = {
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
