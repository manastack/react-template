import { withEmotionNamingProvider } from '@manauser/react-emotion-naming'
import { withRenderLogProvider } from '@manauser/react-render-log'
import compose from 'compose-function'

export const withProviders = compose(
  withEmotionNamingProvider.bind({
    debugEnabled: import.meta.env.MODE !== 'production',
  }),
  withRenderLogProvider.bind({
    debugEnabled: import.meta.env.MODE !== 'production',
    isStrictMode: import.meta.env.MODE === 'development',
  }),
)
