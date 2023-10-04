import {
  PostsItemReadingDtoSchema,
  PostsReadingModelSchema,
  PostUpdatingDtoSchema,
} from '@entities/post/posts.types'
import { ApiConfig } from '@shared/lib/api'

// MainQueryKey is first item in query-key-list for one request (for example - ['postsReading', <page>, <filter>]):
export enum MainQueryKey {
  postUpdating = 'postUpdating',
  postsReading = 'postsReading',
}

export const apiConfig: ApiConfig<MainQueryKey> = {
  [MainQueryKey.postUpdating]: {
    getUrl: ((id: number) => `/api/posts/${id}`) as (
      ...args: unknown[]
    ) => string,

    messageGetterDict: {
      error: (details) =>
        `Error while updating post${details ? `: ${details}` : ''}`,

      loading: () => 'Updating post...',
      success: () => 'Post updated successfully',
    },
    method: 'put',
    mock: {
      delay: 1000,
      enabled: true,
      loader: () => import('../../entities/post/posts.mock'),
      url: /api\/posts\/\d+/,
    },
    requestSchema: PostUpdatingDtoSchema,
    responseSchema: PostsItemReadingDtoSchema,
  },
  [MainQueryKey.postsReading]: {
    getUrl: () => '/api/posts',
    messageGetterDict: {
      error: (details) =>
        `Error while fetching posts${details ? `: ${details}` : ''}`,

      loading: () => 'Fetching posts...',
      success: () => 'Posts fetched successfully',
    },
    method: 'get',
    mock: {
      delay: 500,
      enabled: true,
      loader: () => import('../../entities/post/posts.mock'),
      url: '/api/posts',
    },
    responseSchema: PostsReadingModelSchema,
  },
}
