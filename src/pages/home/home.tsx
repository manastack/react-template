import { FC } from 'react'
import reactLogo from '@assets/images/react.svg'
import {
  PropsWithEmotionNaming,
  withEmotionNaming,
} from '@manauser/react-emotion-naming'
import { withRenderLog } from '@manauser/react-render-log'

import { Posts } from '@widgets/posts'

import { StyledHome } from './home.style'

const Home: FC<PropsWithEmotionNaming<{}>> = ({ setClassName }) => (
  <StyledHome className={setClassName('Home')}>
    <img src={reactLogo} alt="" className="fixed right-4 top-4 h-4" />
    <Posts />
  </StyledHome>
)

export default withEmotionNaming(withRenderLog(Home))
