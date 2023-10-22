import { ReactNode } from 'react'
import { Route, RouteProps } from 'react-router-dom'

import RouteElement, { ElementProps } from './route-element'

const defaultTitle: string = 'React App' // todo - get from env

export type RouteConfig = ElementProps & {
  index?: true
  nestedRouteConfigs?: RouteConfig[]
  path?: string
}

function createRoute({
  index,
  nestedRouteConfigs,
  path,
  title,
  ...baseElementProps
}: RouteConfig): ReactNode {
  const routeProps = {
    element: (
      <RouteElement
        {...baseElementProps}
        title={!nestedRouteConfigs ? title || defaultTitle : ''}
      />
    ),
    ...(index ? { index } : {}),
    key: baseElementProps.id,
    ...(path ? { path } : {}),
  } as RouteProps

  if (!nestedRouteConfigs || !nestedRouteConfigs.length) {
    return <Route {...routeProps} />
  }

  return (
    // @ts-ignore
    <Route {...routeProps}>
      {nestedRouteConfigs.map((routeConfig) =>
        createRoute({ ...routeConfig, title: routeConfig.title || title }),
      )}
    </Route>
  )
}

export default createRoute
