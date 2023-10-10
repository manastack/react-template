import { createContext } from 'react'

export type ModalContextValue = {
  hidden: boolean
  setHidden: (hidden: boolean) => void
}

export const ModalContext = createContext<ModalContextValue>({
  hidden: true,
  setHidden: () => {},
})
