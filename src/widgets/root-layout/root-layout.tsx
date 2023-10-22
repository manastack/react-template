import { FC } from 'react'
import { Outlet } from 'react-router-dom'
import {
  PropsWithEmotionNaming,
  withEmotionNaming,
} from '@manauser/react-emotion-naming'
import { withRenderLog } from '@manauser/react-render-log'

import { Header } from './header'

import { StyledRootLayout } from './root-layout.style'

const RootLayout: FC<PropsWithEmotionNaming<{}>> = ({ setClassName }) => (
  <StyledRootLayout className={setClassName('RootLayout')}>
    <Header />
    <Outlet />
  </StyledRootLayout>
)

export default withEmotionNaming(withRenderLog(RootLayout))
