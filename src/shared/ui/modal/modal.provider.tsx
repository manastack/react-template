import { FC, PropsWithChildren, useState } from 'react'
import { withRenderLog } from '@manauser/react-render-log'

import { ModalContext } from './modal.context'

export type OwnModalProviderProps = {}

const ModalProvider: FC<PropsWithChildren<OwnModalProviderProps>> = ({
  children,
}) => {
  const [hidden, setHidden] = useState<boolean>(true)

  const value = { hidden, setHidden }

  return (
    <ModalContext.Provider {...{ value }}>{children}</ModalContext.Provider>
  )
}

export default withRenderLog(ModalProvider)
