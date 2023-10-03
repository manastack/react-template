import { AxiosRequestConfig } from 'axios'

import { apiConfig } from '@app/config'
import { mockAdapter, MockStore } from '@shared/lib/api'
import { delay as wait, withDelay } from '@shared/lib/async'
import { PostsItemReadingDto, PostsReadingDto } from './posts.types'

const mock = () => {
  const PostsMock: PostsReadingDto = [
    {
      body: 'body 1',
      id: 1,
      title: 'title 1',
      userId: 1,
    },
    {
      body: 'body 2',
      id: 2,
      title: 'title 2',
      userId: 2,
    },
    {
      body: 'body 3',
      id: 3,
      title: 'title 3',
      userId: 3,
    },
  ]

  const postsMockStore = new MockStore<PostsReadingDto>(PostsMock)

  const { postUpdating, postsReading } = apiConfig

  // postsReading:
  // todo: take out this fn to MockStore
  ;((store) => {
    const { enabled, delay, url } = postsReading.mock ?? {}
    enabled &&
      url &&
      mockAdapter.onGet(url).reply(withDelay([200, store.data], delay ?? 0))
  })(postsMockStore)

  // postUpdating:
  // todo: take out this fn to MockStore
  ;((store) => {
    const { enabled, delay, url } = postUpdating.mock ?? {}

    enabled &&
      url &&
      mockAdapter.onPut(url).reply(
        async ({
          data,
        }: AxiosRequestConfig): Promise<[number, PostsItemReadingDto?]> => {
          const dto = JSON.parse(data) as PostsItemReadingDto

          const post = store.data?.find(({ id }) => id === dto.id)

          await wait(delay ?? 0)

          if (!post) {
            return [404]
          }

          post.body = dto.body
          post.title = dto.title

          return [200, dto]
        },
      )
  })(postsMockStore)
}

mock()
