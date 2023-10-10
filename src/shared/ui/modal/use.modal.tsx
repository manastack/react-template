import { useContext } from 'react'

import { ModalContext, ModalContextValue } from './modal.context'

export const useModal = () => useContext<ModalContextValue>(ModalContext)
