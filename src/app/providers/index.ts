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
import { colorConsoleLog } from '@shared/lib/logger'
import { withSnackbarProvider } from '@shared/lib/snackbar'
import { apiConfig, envConfig, EnvKey, MainQueryKey } from '../config'

const debugEnabled = import.meta.env.MODE !== 'production'
const isStrictMode = import.meta.env.MODE === 'development'
const globalMockEnabled = import.meta.env.VITE_MOCK_ENABLED === 'true'
const isTest = import.meta.env.MODE === 'test'
const queryDevtoolsEnabled =
  import.meta.env.VITE_REACT_QUERY_DEVTOOLS_ENABLED === 'true'

const ownEmotionNamingProviderProps: OwnEmotionNamingProviderProps = {
  debugEnabled,
}

const ownRenderLogProviderProps: OwnRenderLogProviderProps = {
  debugEnabled,
  isStrictMode,
}

const ownEnvProviderProps: OwnEnvProviderProps<EnvKey> = {
  env: import.meta.env,
  envConfig,
}

const ownApiProviderProps: OwnApiProviderProps<MainQueryKey> = {
  config: apiConfig,
  globalMockEnabled,
  isTest,
  logger: {
    error: [
      (p: string) => enqueueSnackbar(p, { variant: 'error' }),
      ...(debugEnabled
        ? [(message: string) => colorConsoleLog({ color: 'red', message })]
        : []),
    ],
    loading: debugEnabled
      ? [(message: string) => colorConsoleLog({ color: 'gray', message })]
      : [],
    success: [
      (p: string) => enqueueSnackbar(p, { variant: 'success' }),
      ...(debugEnabled
        ? [(message: string) => colorConsoleLog({ color: 'skyblue', message })]
        : []),
    ],
  },
  queryDevtoolsEnabled,
}

// todo: add ability to use context one provider in another (take out env provider from api provider etc)
export const withProviders = compose(
  withSnackbarProvider,
  withEmotionNamingProvider.bind(ownEmotionNamingProviderProps),
  withRenderLogProvider.bind(ownRenderLogProviderProps),
  withEnvProvider.bind(ownEnvProviderProps),
  withApiProvider.bind(ownApiProviderProps), // must be after withSnackbarProvider
)
