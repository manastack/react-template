import { FC } from 'react'
import { Global } from '@emotion/react'

import { env } from '@shared/config'

import { StyledApp } from './styles/app.style'
import { GlobalStyles } from './styles/global.style'

const App: FC = () => (
  <>
    <Global styles={GlobalStyles} />
    <StyledApp>app</StyledApp>
    <span style={{ display: 'none' }}>{env.VITE_TIMESTAMP}</span>
  </>
)

export default App
