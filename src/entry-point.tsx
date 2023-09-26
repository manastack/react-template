import { StrictMode } from 'react'
import ReactDOM from 'react-dom/client'

import { App } from '@app'
import { apiConfig } from '@app/config'

// eslint-disable-next-line
;(async () => {
  if (import.meta.env.VITE_MOCK_ENABLED === 'true') {
    const { default: loadMock } = await import('./shared/lib/api/mock-loader')
    await loadMock(apiConfig)
  }

  ReactDOM.createRoot(document.getElementById('root')!).render(
    <StrictMode>
      <App />
    </StrictMode>,
  )
})()
