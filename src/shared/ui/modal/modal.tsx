import { FC, PropsWithChildren } from 'react'
import {
  PropsWithEmotionNaming,
  withEmotionNaming,
} from '@manauser/react-emotion-naming'
import { withRenderLog } from '@manauser/react-render-log'

import { StyledModal, StyledModalContainer } from './modal.style'

type OwnProps = {
  hidden: boolean
  setHidden: (hidden: boolean) => void
}

const Modal: FC<PropsWithEmotionNaming<PropsWithChildren<OwnProps>>> = ({
  children,
  hidden,
  setClassName,
  setHidden,
}) => (
  <StyledModalContainer
    className={setClassName('ModalContainer')}
    {...{ hidden }}
    onClick={() => setHidden(true)}
  >
    <StyledModal
      className={setClassName('Modal')}
      onClick={(e) => e.stopPropagation()}
    >
      {children}
    </StyledModal>
  </StyledModalContainer>
)

export default withEmotionNaming(withRenderLog(Modal))
