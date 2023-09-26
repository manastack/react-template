import { FC, useState } from 'react'
import {
  PropsWithEmotionNaming,
  withEmotionNaming,
} from '@manauser/react-emotion-naming'
import { withRenderLog } from '@manauser/react-render-log'

import { PostsItemModel, usePostsFetching } from '@entities/post'
import { PostEditor, PostViewer } from './posts-item'

import { StyledPosts } from './posts.style'

type Props = {}
const Posts: FC<PropsWithEmotionNaming<Props>> = ({ setClassName }) => {
  const { hasPostsError, isPostsLoading, posts } = usePostsFetching()

  const [editedPostId, setEditedPostId] = useState<PostsItemModel['id'] | null>(
    null,
  )

  return (
    <StyledPosts className={setClassName('Posts')}>
      {isPostsLoading && <div>Loading...</div>}
      {hasPostsError && <div>Error</div>}
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
