import { ApiItemConfig } from '@shared/lib/api'

type QueryKey = 'postsReading'

export const apiConfig: Record<QueryKey, ApiItemConfig> = {
  postsReading: {
    getMessages: () => ({ error: 'Error by posts-loading or -parsing' }),
    getUrl: () => 'https://jsonplaceholder.typicode.com/posts',
    mock: {
      enabled: true,
      loader: () => import('../../entities/post/posts.mock'),
    },
  },
}
