import { FC } from 'react'
import {
  PropsWithEmotionNaming,
  withEmotionNaming,
} from '@manauser/react-emotion-naming'
import { withRenderLog } from '@manauser/react-render-log'

import { StyledButtonSymbol } from './button-symbol.style'

type Props = {
  action: (...p: unknown[]) => void
  className?: string
  label: string
}

const ButtonSymbol: FC<PropsWithEmotionNaming<Props>> = ({
  action,
  className = '',
  label,
  setClassName,
}) => (
  <StyledButtonSymbol
    className={setClassName('ButtonSymbol', className)}
    onClick={action}
  >
    {label}
  </StyledButtonSymbol>
)

export default withEmotionNaming(withRenderLog(ButtonSymbol))
