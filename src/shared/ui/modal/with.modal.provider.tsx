import { ComponentType } from 'react'

import ModalProvider, { OwnModalProviderProps } from './modal.provider'

type WithModalProvider = <Props extends {}>(
  this: OwnModalProviderProps,
  Component: ComponentType<Props>,
) => ComponentType<Props>

export const withModalProvider: WithModalProvider = function <Props extends {}>(
  this: OwnModalProviderProps,
  Component: ComponentType<Props>,
): ComponentType<Props> {
  return (props: Props) => (
    <ModalProvider {...this}>
      <Component {...props} />
    </ModalProvider>
  )
}
