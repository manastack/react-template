import { ButtonHTMLAttributes, DetailedHTMLProps, FC } from 'react'
import {
  PropsWithEmotionNaming,
  withEmotionNaming,
} from '@manauser/react-emotion-naming'
import { withRenderLog } from '@manauser/react-render-log'

import { StyledButtonSymbol } from './button-symbol.style'

type Props = DetailedHTMLProps<
  ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
> & {
  handleClick?: (...p: unknown[]) => void
  className?: string
  label: string
}

const ButtonSymbol: FC<PropsWithEmotionNaming<Props>> = ({
  handleClick: onClick,
  className = '',
  disabled = false,
  label,
  setClassName,
}) => (
  <StyledButtonSymbol
    className={setClassName('ButtonSymbol', className)}
    {...{ disabled, onClick }}
  >
    {label}
  </StyledButtonSymbol>
)

export default withEmotionNaming(withRenderLog(ButtonSymbol))
