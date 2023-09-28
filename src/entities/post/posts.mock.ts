import { AxiosRequestConfig } from 'axios'

import { apiConfig } from '@app/config'
import { mockAdapter, MockStore } from '@shared/lib/api'
import { delay, withDelay } from '@shared/lib/async'
import { PostsDto, PostsItemDto } from './posts.model'

const mock = () => {
  const PostsMock: PostsDto = [
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

  const postsMockStore = new MockStore<PostsDto>(PostsMock)

  const { postUpdating, postsReading } = apiConfig

  postsReading.mock?.enabled &&
    postsReading.mock.getUrl &&
    mockAdapter
      .onGet(postsReading.mock.getUrl())
      .reply(
        withDelay([200, postsMockStore.data], postsReading.mock.delay ?? 0),
      )

  postUpdating.mock?.enabled &&
    postUpdating.mock.getUrl &&
    mockAdapter.onPut(postUpdating.mock.getUrl()).reply(
      async ({
        data,
      }: AxiosRequestConfig): Promise<[number, PostsItemDto?]> => {
        const dto = JSON.parse(data) as PostsItemDto
        const post = postsMockStore.data?.find(({ id }) => id === dto.id)

        await delay(postUpdating.mock?.delay ?? 0)

        if (!post) {
          return [404]
        }

        post.body = dto.body
        post.title = dto.title

        return [200, dto]
      },
    )
}

mock()
