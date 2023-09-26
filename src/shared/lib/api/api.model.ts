import { ComponentType } from 'react'

import { Logger } from '@shared/lib/logger'

type QueryStatus = 'loading' | 'error' | 'success'

type ApiMessageGetter = (p?: string | number) => string

export type ApiMessageGetterDict = Partial<
  Record<QueryStatus, ApiMessageGetter>
>

export type ApiItemConfig = {
  messageGetterDict: ApiMessageGetterDict
  getUrl: (...args: unknown[]) => string
  mock?: {
    enabled: boolean
    delay?: number
    loader: () => Promise<unknown>
  }
}

export type OwnApiProviderProps = {
  isTest?: boolean
  logger?: Logger<QueryStatus>
}

export type WithApiProvider = <Props extends {}>(
  this: OwnApiProviderProps,
  Component: ComponentType<Props>,
) => ComponentType<Props>
