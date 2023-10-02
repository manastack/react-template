import { ComponentType } from 'react'

import ApiProvider from './api.provider'
import { OwnApiProviderProps, WithApiProvider } from './api.types'

export const withApiProvider: WithApiProvider = function <
  MainQueryKey extends string,
  Props extends {}
>(
  this: OwnApiProviderProps<MainQueryKey>,
  Component: ComponentType<Props>,
): ComponentType<Props> {
  const ownApiProviderProps: OwnApiProviderProps<MainQueryKey> = this

  return (props: Props) => (
    <ApiProvider {...ownApiProviderProps}>
      <Component {...props} />
    </ApiProvider>
  )
}
