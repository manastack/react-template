import { FC, Suspense } from 'react'
import { HelmetProvider } from 'react-helmet-async'
import { HashRouter, Routes } from 'react-router-dom'
import { Global } from '@emotion/react'
import {
  PropsWithEmotionNaming,
  withEmotionNaming,
} from '@manauser/react-emotion-naming'
import { useEnvContext } from '@manauser/react-env'
import { withRenderLog } from '@manauser/react-render-log'

import { createRoute } from '@shared/lib/routing'
import { EnvKey, rootRouteListConfig } from './config'
import { withProviders } from './providers'

import './styles/tailwind.css'
import { StyledApp } from './styles/app.style'
import { GlobalStyles } from './styles/global.style'

const App: FC<PropsWithEmotionNaming<{}>> = ({ setClassName }) => {
  const { VITE_TIMESTAMP } = useEnvContext<EnvKey>()

  return (
    <HelmetProvider>
      <Global styles={GlobalStyles} />
      <StyledApp className={setClassName('App')}>
        <Suspense
          fallback={
            <div className="fixed left-0 top-0 h-1 w-full bg-red-600" />
          }
        >
          <HashRouter>
            <Routes>{rootRouteListConfig.map(createRoute)}</Routes>
          </HashRouter>
        </Suspense>
      </StyledApp>
      <span className="hidden">{VITE_TIMESTAMP}</span>
    </HelmetProvider>
  )
}

export default withProviders(withEmotionNaming(withRenderLog(App)))
