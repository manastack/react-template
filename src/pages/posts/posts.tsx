import { FC } from 'react'
import {
  PropsWithEmotionNaming,
  withEmotionNaming,
} from '@manauser/react-emotion-naming'
import { withRenderLog } from '@manauser/react-render-log'

import { Header } from '@widgets/header'
import { Posts as PostsWidget } from '@widgets/posts'

import { StyledPosts } from './posts.style'

const Posts: FC<PropsWithEmotionNaming<{}>> = ({ setClassName }) => (
  <StyledPosts className={setClassName('Posts')}>
    <Header />
    <PostsWidget />
  </StyledPosts>
)

export default withEmotionNaming(withRenderLog(Posts))
