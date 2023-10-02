import { createContext } from 'react'

import { ApiContextValue } from './api.types'

export const ApiContext = (<MainQueryKey extends string>() =>
  createContext<ApiContextValue<MainQueryKey>>({
    config: {},
  } as ApiContextValue<MainQueryKey>))()
