import { FC } from 'react'
import { Global } from '@emotion/react'
import {
  PropsWithEmotionNaming,
  withEmotionNaming,
} from '@manauser/react-emotion-naming'
import { withRenderLog } from '@manauser/react-render-log'

import { Home } from '@pages/home'
import { env } from '@shared/config'
import { withProviders } from './providers'

import { StyledApp } from './styles/app.style'
import { GlobalStyles } from './styles/global.style'

const App: FC<PropsWithEmotionNaming<{}>> = ({ setClassName }) => (
  <>
    <Global styles={GlobalStyles} />
    <StyledApp className={setClassName('App')}>
      <Home />
    </StyledApp>
    <span style={{ display: 'none' }}>{env.VITE_TIMESTAMP}</span>
  </>
)

export default withProviders(withEmotionNaming(withRenderLog(App)))
