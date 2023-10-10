import { ComponentType } from 'react'

import { ModalContextValue } from './modal.context'
import { useModal } from './use.modal'

export type PropsWithModal<T> = T & ModalContextValue

export const withModal = <Props extends {}>(
  Component: ComponentType<PropsWithModal<Props>>,
): ComponentType<Props> => (props: Props) => {
  const modalContextValue: ModalContextValue = useModal()

  return <Component {...props} {...modalContextValue} />
}
