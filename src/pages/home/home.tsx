import { FC } from 'react'
import {
  PropsWithEmotionNaming,
  withEmotionNaming,
} from '@manauser/react-emotion-naming'
import { withRenderLog } from '@manauser/react-render-log'

import { usePostsFetching } from '@entities/post'

import { StyledHome } from './home.style'

const Home: FC<PropsWithEmotionNaming<{}>> = ({ setClassName }) => {
  const { hasPostsError, isPostsLoading, posts } = usePostsFetching()

  return (
    <StyledHome className={setClassName('Home')}>
      {isPostsLoading && <div>Loading...</div>}
      {hasPostsError && <div>Error</div>}
      {posts && <div>{posts.length} posts</div>}
    </StyledHome>
  )
}

export default withEmotionNaming(withRenderLog(Home))
