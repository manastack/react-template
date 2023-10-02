import { withEmotionNamingProvider } from '@manauser/react-emotion-naming'
import { OwnEmotionNamingProviderProps } from '@manauser/react-emotion-naming/build/emotion-naming.model'
import { OwnEnvProviderProps, withEnvProvider } from '@manauser/react-env'
import {
  OwnRenderLogProviderProps,
  withRenderLogProvider,
} from '@manauser/react-render-log'
import compose from 'compose-function'
import { enqueueSnackbar } from 'notistack'

import { OwnApiProviderProps, withApiProvider } from '@shared/lib/api'
import { withSnackbarProvider } from '@shared/lib/snackbar'
import { apiConfig, envConfig, EnvKey, MainQueryKey } from '../config'

const ownEmotionNamingProviderProps: OwnEmotionNamingProviderProps = {
  debugEnabled: import.meta.env.MODE !== 'production',
}

const ownRenderLogProviderProps: OwnRenderLogProviderProps = {
  debugEnabled: import.meta.env.MODE !== 'production',
  isStrictMode: import.meta.env.MODE === 'development',
}

const ownEnvProviderProps: OwnEnvProviderProps<EnvKey> = {
  env: import.meta.env,
  envConfig,
}

const ownApiProviderProps: OwnApiProviderProps<MainQueryKey> = {
  config: apiConfig,
  globalMockEnabled: import.meta.env.VITE_MOCK_ENABLED === 'true',
  isTest: import.meta.env.MODE === 'test',
  logger: {
    error: [
      console.error, // eslint-disable-line no-console
      (p: string) => enqueueSnackbar(p, { variant: 'error' }),
    ],
    loading: [console.log], // eslint-disable-line no-console
    success: [
      console.log, // eslint-disable-line no-console
      (p: string) => enqueueSnackbar(p, { variant: 'success' }),
    ],
  },
  queryDevtoolsEnabled:
    import.meta.env.VITE_REACT_QUERY_DEVTOOLS_ENABLED === 'true',
}

// todo: add ability to use context one provider in another (take out env provider from api provider etc)
export const withProviders = compose(
  withSnackbarProvider,
  withEmotionNamingProvider.bind(ownEmotionNamingProviderProps),
  withRenderLogProvider.bind(ownRenderLogProviderProps),
  withEnvProvider.bind(ownEnvProviderProps),
  withApiProvider.bind(ownApiProviderProps), // must be after withSnackbarProvider
)
