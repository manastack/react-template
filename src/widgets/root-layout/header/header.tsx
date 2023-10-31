import { FC } from 'react'
import {
  PropsWithEmotionNaming,
  withEmotionNaming,
} from '@manauser/react-emotion-naming'
import { withRenderLog } from '@manauser/react-render-log'

import { StyledHeader, StyledNavLink } from './header.style'

const Header: FC<PropsWithEmotionNaming<{}>> = ({ setClassName }) => (
  <StyledHeader className={setClassName('Header')}>
    <StyledNavLink to="/" className={setClassName('NavLink')}>
      Home
    </StyledNavLink>
    <StyledNavLink to="/posts" className={setClassName('NavLink')}>
      Posts
    </StyledNavLink>
    <StyledNavLink to="/kanban" className={setClassName('NavLink')}>
      Kanban Board
    </StyledNavLink>
  </StyledHeader>
)

export default withEmotionNaming(withRenderLog(Header))
