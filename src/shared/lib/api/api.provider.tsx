import { PropsWithChildren, Suspense, useEffect, useState } from 'react'
import {
  DefaultOptions,
  QueryClient,
  QueryClientProvider,
  QueryStatus,
} from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

import { LoggerProvider } from '@shared/lib/logger' // todo: take out
import { ApiContext } from './api.context'
import { OwnApiProviderProps } from './api.types'

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

const ApiProvider = <MainQueryKey extends string>(
  props: PropsWithChildren<OwnApiProviderProps<MainQueryKey>>,
) => {
  const {
    children,
    config,
    globalMockEnabled = false,
    isTest = false,
    logger = { error: [], loading: [], success: [] },
    queryDevtoolsEnabled = false,
  } = props

  const [mockDefined, setMockDefined] = useState<boolean>(false)

  useEffect(() => {
    ;(!isTest &&
      globalMockEnabled &&
      (async () => {
        const { default: loadMock } = await import('./mock-loader')
        await loadMock(config)
        setMockDefined(true)
      })()) ||
      setMockDefined(true)
  }, [config, globalMockEnabled, isTest])

  const value = { config, globalMockEnabled }

  if (!mockDefined) {
    return null
  }

  return (
    <ApiContext.Provider {...{ value }}>
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
    </ApiContext.Provider>
  )
}

export default ApiProvider
