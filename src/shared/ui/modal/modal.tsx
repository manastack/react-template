import { FC, memo, PropsWithChildren } from 'react'
import {
  PropsWithEmotionNaming,
  withEmotionNaming,
} from '@manauser/react-emotion-naming'
import { withRenderLog } from '@manauser/react-render-log'

import { PropsWithModal, withModal } from './with.modal'

import { StyledModalContainer } from './modal.style'

const Modal: FC<PropsWithModal<PropsWithEmotionNaming<PropsWithChildren>>> = ({
  children,
  setClassName,
  setHidden,
}) => (
  <StyledModalContainer
    className={setClassName('ModalContainer')}
    onClick={() => setHidden(true)}
  >
    <div className={setClassName('Modal')} onClick={(e) => e.stopPropagation()}>
      {children}
    </div>
  </StyledModalContainer>
)

export default memo(withModal(withEmotionNaming(withRenderLog(Modal))))
