import { createContext } from 'react'

import { FetchContextValue } from './use.fetch'

export const FetchContext = createContext<FetchContextValue<unknown>>({
  data: null,
  hasError: false,
  isLoading: false,
})
