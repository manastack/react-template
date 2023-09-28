import { FC } from 'react'
import {
  PropsWithEmotionNaming,
  withEmotionNaming,
} from '@manauser/react-emotion-naming'
import { withRenderLog } from '@manauser/react-render-log'

import { Header } from '@widgets/header'
import { Posts } from '@widgets/posts'

import { StyledHome } from './home.style'

const Home: FC<PropsWithEmotionNaming<{}>> = ({ setClassName }) => (
  <StyledHome className={setClassName('Home')}>
    <Header />
    <Posts />
  </StyledHome>
)

export default withEmotionNaming(withRenderLog(Home))
