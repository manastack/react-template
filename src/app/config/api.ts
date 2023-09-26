import { ApiItemConfig } from '@shared/lib/api'

type QueryKey = 'postsReading'

export const apiConfig: Record<QueryKey, ApiItemConfig> = {
  postsReading: {
    getUrl: () => 'https://jsonplaceholder.typicode.com/posts',
    messageGetterDict: {
      error: () => 'Error while fetching posts',
    },
    mock: {
      enabled: true,
      loader: () => import('../../entities/post/posts.mock'),
    },
  },
}
