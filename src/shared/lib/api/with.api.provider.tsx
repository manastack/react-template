import { ComponentType } from 'react'

import { OwnApiProviderProps, WithApiProvider } from './api.model'
import ApiProvider from './api.provider'

export const withApiProvider: WithApiProvider = function <Props extends {}>(
  this: OwnApiProviderProps,
  Component: ComponentType<Props>,
): ComponentType<Props> {
  const ownApiProviderProps: OwnApiProviderProps = this

  return (props: Props) => (
    <ApiProvider {...ownApiProviderProps}>
      <Component {...props} />
    </ApiProvider>
  )
}
