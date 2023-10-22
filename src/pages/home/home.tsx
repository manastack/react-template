import { FC } from 'react'
import {
  PropsWithEmotionNaming,
  withEmotionNaming,
} from '@manauser/react-emotion-naming'
import { withRenderLog } from '@manauser/react-render-log'

import { StyledHome } from './home.style'

const Home: FC<PropsWithEmotionNaming<{}>> = ({ setClassName }) => (
  <StyledHome className={setClassName('Home')}>home</StyledHome>
)

export default withEmotionNaming(withRenderLog(Home))
