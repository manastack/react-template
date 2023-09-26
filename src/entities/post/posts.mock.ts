import { apiConfig } from '@app/config'
import { mockAdapter, MockStore } from '@shared/lib/api'
import { withDelay } from '@shared/lib/async'
import { PostsItemModel, PostsModel } from './posts.model'

const mock = () => {
  const PostsMock: PostsModel = [
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

  const postsMockStore = new MockStore<PostsModel>(PostsMock)

  const { postsReading } = apiConfig

  if (!postsReading.mock?.enabled) return

  mockAdapter
    .onGet(postsReading.getUrl())
    .reply(withDelay([200, postsMockStore.data], 1000))

  mockAdapter.onPut(postsReading.getUrl()).reply((config) => {
    const dto = JSON.parse(config.data) as PostsItemModel
    const post = postsMockStore.data?.find(({ id }) => id === dto.id)

    if (!post) {
      return [404]
    }

    post.body = dto.body
    post.title = dto.title

    return [200]
  })
}

mock()
