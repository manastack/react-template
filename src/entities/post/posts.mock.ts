import { apiConfig } from '@app/config'
import { mockAdapter, MockStore } from '@shared/lib/api'
import { withDelay } from '@shared/lib/async'
import { PostsModel } from './posts.model'

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

postsReading.mock?.enabled &&
  mockAdapter
    .onGet(postsReading.getUrl())
    .reply(withDelay([200, postsMockStore.data], 1000))
