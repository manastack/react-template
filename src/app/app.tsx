import { FC } from 'react'
import { Global } from '@emotion/react'
import {
  PropsWithEmotionNaming,
  withEmotionNaming,
} from '@manauser/react-emotion-naming'
import { useEnvContext } from '@manauser/react-env'
import { withRenderLog } from '@manauser/react-render-log'

import { Home } from '@pages/home'
import { EnvKey } from './config'
import { withProviders } from './providers'

import './styles/tailwind.css'
import { StyledApp } from './styles/app.style'
import { GlobalStyles } from './styles/global.style'

const App: FC<PropsWithEmotionNaming<{}>> = ({ setClassName }) => {
  const { VITE_TIMESTAMP } = useEnvContext<EnvKey>()

  return (
    <>
      <Global styles={GlobalStyles} />
      <StyledApp className={setClassName('App')}>
        <Home />
      </StyledApp>
      <span className="hidden">{VITE_TIMESTAMP}</span>
    </>
  )
}

export default withProviders(withEmotionNaming(withRenderLog(App)))
