import { FC, useMemo } from 'react'
import {
  PropsWithEmotionNaming,
  withEmotionNaming,
} from '@manauser/react-emotion-naming'
import { withRenderLog } from '@manauser/react-render-log'

import { StyledHeader, StyledNavLink } from './header.style'

const Header: FC<PropsWithEmotionNaming<{}>> = ({ setClassName }) => {
  type MenuItem = {
    id: string
    label: string
    path: string
  }

  const menuItems: MenuItem[] = useMemo(
    () => [
      {
        id: 'home',
        label: 'Home',
        path: '/',
      },
      {
        id: 'posts',
        label: 'Posts',
        path: '/posts',
      },
      {
        id: 'dnd-list',
        label: 'Dnd-List',
        path: '/dnd-list',
      },
      {
        id: 'kanban',
        label: 'Kanban-Board',
        path: '/kanban',
      },
    ],
    [],
  )

  return (
    <StyledHeader className={setClassName('Header')}>
      {menuItems.map(({ id, label, path }) => (
        <StyledNavLink key={id} className={setClassName('NavLink')} to={path}>
          {label}
        </StyledNavLink>
      ))}
    </StyledHeader>
  )
}

export default withEmotionNaming(withRenderLog(Header))
