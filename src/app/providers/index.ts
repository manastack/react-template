import { withEmotionNamingProvider } from '@manauser/react-emotion-naming'
import {
  OwnEnvProviderProps,
  WithEnvProvider,
  withEnvProvider,
} from '@manauser/react-env'
import { withRenderLogProvider } from '@manauser/react-render-log'
import compose from 'compose-function'

import { envConfig, EnvKey } from '../config'

export const withProviders = compose(
  withEmotionNamingProvider.bind({
    debugEnabled: import.meta.env.MODE !== 'production',
  }),
  withRenderLogProvider.bind({
    debugEnabled: import.meta.env.MODE !== 'production',
    isStrictMode: import.meta.env.MODE === 'development',
  }),
  (withEnvProvider as WithEnvProvider<EnvKey>).bind({
    env: import.meta.env,
    envConfig,
  } as OwnEnvProviderProps<EnvKey>),
)
