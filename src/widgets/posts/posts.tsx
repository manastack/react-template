import { FC, useState } from 'react'
import {
  PropsWithEmotionNaming,
  withEmotionNaming,
} from '@manauser/react-emotion-naming'
import { withRenderLog } from '@manauser/react-render-log'
import { ZodTypeDef } from 'zod/lib/types'

import { MainQueryKey } from '@app/config'
import { PostsItemReadingModel } from '@entities/post'
import { PostsReadingDto, PostsReadingModel } from '@entities/post/posts.types'
import { useFetching } from '@shared/lib/api'
import { PostEditor, PostViewer } from './posts-item'

import { StyledPosts } from './posts.style'

type Props = {}

// todo - rename this component to PostsList
const Posts: FC<PropsWithEmotionNaming<Props>> = ({ setClassName }) => {
  type QueryKey = [MainQueryKey]
  const { data: posts, isError, isLoading } = useFetching<
    QueryKey,
    PostsReadingModel,
    ZodTypeDef,
    PostsReadingDto
  >({
    queryKey: [MainQueryKey.postsReading],
  })

  const [editedPostId, setEditedPostId] = useState<
    PostsItemReadingModel['id'] | null
  >(null)

  return (
    <StyledPosts className={setClassName('PostList')}>
      {isLoading && <div>Loading...</div>}
      {isError && <div>Error</div>}
      {posts?.map((post) => {
        if (editedPostId === post.id) {
          return (
            <PostEditor
              key={post.id}
              {...post}
              closePostEditor={() => setEditedPostId(null)}
              renderLogId={post.id}
            />
          )
        }

        return (
          <PostViewer
            key={post.id}
            {...post}
            handleEdit={setEditedPostId}
            renderLogId={post.id}
          />
        )
      })}
    </StyledPosts>
  )
}

export default withEmotionNaming(withRenderLog(Posts))
