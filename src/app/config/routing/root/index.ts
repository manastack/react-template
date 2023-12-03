import { Home } from '@pages/home'
import { getLazyComponent } from '@shared/lib/async'
import { RouteConfig } from '@shared/lib/routing'
import { RootLayout } from '@widgets/root-layout'

export const rootRouteListConfig: RouteConfig[] = [
  {
    component: RootLayout,
    id: 'root-layout',
    nestedRouteConfigs: [
      {
        id: 'dnd-list',
        lazyComponent: getLazyComponent('/src/pages/dnd-list'),
        path: 'dnd-list',
        title: 'DnD List',
      },
      {
        component: Home,
        id: 'home',
        index: true,
      },
      {
        id: 'kanban',
        lazyComponent: getLazyComponent('/src/pages/kanban'),
        path: 'kanban',
        title: 'Kanban Board',
      },
      {
        id: 'posts',
        lazyComponent: getLazyComponent('/src/pages/posts'),
        path: 'posts',
        title: 'Posts',
      },
    ],
    path: '/',
  },
  {
    id: 'no-match',
    lazyComponent: getLazyComponent('/src/pages/no-match'),
    path: '*',
  },
]
