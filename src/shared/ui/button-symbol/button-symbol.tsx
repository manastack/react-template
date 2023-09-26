import { FC } from 'react'
import {
  PropsWithEmotionNaming,
  withEmotionNaming,
} from '@manauser/react-emotion-naming'
import { withRenderLog } from '@manauser/react-render-log'

import { StyledButtonSymbol } from './button-symbol.style'

type Props = {
  handleClick: (...p: unknown[]) => void
  className?: string
  disabled?: boolean
  label: string
}

const ButtonSymbol: FC<PropsWithEmotionNaming<Props>> = ({
  handleClick,
  className = '',
  disabled = false,
  label,
  setClassName,
}) => (
  <StyledButtonSymbol
    className={setClassName('ButtonSymbol', className)}
    disabled={disabled}
    onClick={handleClick}
  >
    {label}
  </StyledButtonSymbol>
)

export default withEmotionNaming(withRenderLog(ButtonSymbol))
