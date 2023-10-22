import { lazy } from 'react'

import { Home } from '@pages/home'
import { LazyComponent, RouteConfig } from '@shared/lib/routing'
import { RootLayout } from '@widgets/root-layout'

export const rootRouteListConfig: RouteConfig[] = [
  {
    component: RootLayout,
    id: 'root-layout',
    nestedRouteConfigs: [
      {
        component: Home,
        id: 'home',
        index: true,
      },
      {
        id: 'posts',
        lazyComponent: lazy(() => import('@pages/posts')) as LazyComponent,
        path: 'posts',
        title: 'Posts',
      },
    ],
    path: '/',
  },
  {
    id: 'no-match',
    lazyComponent: lazy(() => import('@pages/no-match')) as LazyComponent,
    path: '*',
  },
]
