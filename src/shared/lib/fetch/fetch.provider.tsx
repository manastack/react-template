import { PropsWithChildren, ReactElement } from 'react'

import { FetchContext } from './fetch.context'
import { FetchContextValue, useFetch } from './use.fetch'

export type OwnFetchProviderProps = {
  url: string
}

export const FetchProvider = <D extends unknown>({
  children,
  url,
}: PropsWithChildren<OwnFetchProviderProps>): ReactElement => {
  const value = useFetch<D>(url) as FetchContextValue<unknown>

  return (
    <FetchContext.Provider {...{ value }}>{children}</FetchContext.Provider>
  )
}
