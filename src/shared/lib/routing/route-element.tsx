import { ComponentType, FC, LazyExoticComponent } from 'react'

import Page from './page'

export type LazyComponent = LazyExoticComponent<
  ComponentType<Record<string, unknown>>
>

type BaseElementProps = {
  component?: ComponentType
  componentProps?: Record<string, unknown>
  id: string
  lazyComponent?: LazyComponent
}

export type ElementProps = BaseElementProps & {
  title?: string
}

const RouteElement: FC<ElementProps> = (props) => {
  const {
    component: Component,
    componentProps = {},
    id,
    lazyComponent: LazyComponent,
    title = null,
  } = props

  if (Component) {
    if (title === null) {
      // it's a branch route
      return <Component {...componentProps} />
    }

    // it's a leaf route
    return (
      <Page renderLogId={id} title={title}>
        <Component {...componentProps} />
      </Page>
    )
  }

  if (LazyComponent) {
    const render = () => <LazyComponent {...componentProps} />

    if (title === null) {
      // it's a branch route
      return render()
    }

    // it's a leaf route
    return (
      <Page renderLogId={id} title={title}>
        {render()}
      </Page>
    )
  }

  console.error(`routeCreator.${id}`, 'invalid routeConfigs') // eslint-disable-line no-console
  return null
}

export default RouteElement
