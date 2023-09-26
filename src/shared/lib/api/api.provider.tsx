import { FC, PropsWithChildren, Suspense } from 'react'
import { useEnvContext } from '@manauser/react-env'
import {
  DefaultOptions,
  QueryClient,
  QueryClientProvider,
  QueryStatus,
} from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

import { EnvKey } from '@app/config'
import { LoggerProvider } from '@shared/lib/logger'
import { OwnApiProviderProps } from './api.model'

const defaultOptions: DefaultOptions = {
  mutations: {
    networkMode: 'offlineFirst',
  },
  queries: {
    keepPreviousData: true,
    networkMode: 'offlineFirst',
    refetchOnWindowFocus: false,
    staleTime: 1000 * 60 * 30, // 30 min
  },
}

const queryClient = new QueryClient({ defaultOptions })

export const queryTestClient = new QueryClient({
  defaultOptions: {
    mutations: { ...defaultOptions.mutations },
    queries: {
      ...defaultOptions.queries,
      retry: false,
      staleTime: 0,
    },
  },
})

const ApiProvider: FC<PropsWithChildren<OwnApiProviderProps>> = ({
  children,
  isTest = false,
  logger = { error: [], loading: [], success: [] },
}) => {
  const {
    VITE_REACT_QUERY_DEVTOOLS_ENABLED: queryDevtoolsEnabled,
  } = useEnvContext<EnvKey>()

  return (
    <LoggerProvider<QueryStatus> {...{ logger }}>
      <QueryClientProvider client={isTest ? queryTestClient : queryClient}>
        {children}
        {queryDevtoolsEnabled && (
          <Suspense>
            <ReactQueryDevtools />
          </Suspense>
        )}
      </QueryClientProvider>
    </LoggerProvider>
  )
}

export default ApiProvider
