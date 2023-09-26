import { withEmotionNamingProvider } from '@manauser/react-emotion-naming'
import { OwnEmotionNamingProviderProps } from '@manauser/react-emotion-naming/build/emotion-naming.model'
import { OwnEnvProviderProps, withEnvProvider } from '@manauser/react-env'
import {
  OwnRenderLogProviderProps,
  withRenderLogProvider,
} from '@manauser/react-render-log'
import compose from 'compose-function'

import { OwnApiProviderProps, withApiProvider } from '@shared/lib/api'
import { envConfig, EnvKey } from '../config'

const ownEmotionNamingProviderProps: OwnEmotionNamingProviderProps = {
  debugEnabled: import.meta.env.MODE !== 'production',
}

const withRenderLogProviderProps: OwnRenderLogProviderProps = {
  debugEnabled: import.meta.env.MODE !== 'production',
  isStrictMode: import.meta.env.MODE === 'development',
}

const withEnvProviderProps: OwnEnvProviderProps<EnvKey> = {
  env: import.meta.env,
  envConfig,
}

const withApiProviderProps: OwnApiProviderProps = {
  isTest: import.meta.env.MODE === 'test',
  logger: {
    error: [
      (p: { id: string | number; message?: string }) =>
        console.error(p.id, p.message), // eslint-disable-line no-console
    ],
    loading: [],
    success: [],
  },
}

export const withProviders = compose(
  withEmotionNamingProvider.bind(ownEmotionNamingProviderProps),
  withRenderLogProvider.bind(withRenderLogProviderProps),
  withEnvProvider.bind(withEnvProviderProps),
  withApiProvider.bind(withApiProviderProps),
)
