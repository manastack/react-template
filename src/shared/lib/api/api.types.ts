import { ComponentType } from 'react'
import { ZodType } from 'zod'

import { Logger } from '@shared/lib/logger'

type QueryStatus = 'loading' | 'error' | 'success'

type ApiMessageGetter = (p?: string | number) => string

export type ApiMessageGetterDict = Partial<
  Record<QueryStatus, ApiMessageGetter>
>

type ApiItemConfigBase = {
  messageGetterDict: ApiMessageGetterDict
  getUrl: (...args: unknown[]) => string
  mock?: {
    delay?: number
    enabled: boolean
    getUrl?: (...args: unknown[]) => string | RegExp // todo: change to just url
    loader: () => Promise<unknown>
  }
}

export type ApiItemConfigReading = ApiItemConfigBase & {
  method: 'get'
  responseSchema: ZodType
}

export type ApiItemConfigMutation = ApiItemConfigBase & {
  method: 'put' | 'post' | 'delete'
  requestSchema: ZodType
  responseSchema: ZodType
}

export type ApiItemConfig = ApiItemConfigReading | ApiItemConfigMutation

export type ApiConfig<MainQueryKey extends string> = Record<
  MainQueryKey,
  ApiItemConfig
>

export type ApiContextValue<MainQueryKey extends string> = {
  // todo - add logger here and remove it from use.api-listeners.ts
  config: ApiConfig<MainQueryKey>
  globalMockEnabled?: boolean
}

export type OwnApiProviderProps<MainQueryKey extends string> = {
  config: Record<MainQueryKey, ApiItemConfig>
  globalMockEnabled?: boolean
  isTest?: boolean
  logger?: Logger<QueryStatus>
  queryDevtoolsEnabled?: boolean
}

export type WithApiProvider = <MainQueryKey extends string, Props extends {}>(
  this: OwnApiProviderProps<MainQueryKey>,
  Component: ComponentType<Props>,
) => ComponentType<Props>
