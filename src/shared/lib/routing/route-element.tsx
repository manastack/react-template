import { ComponentType, FC, LazyExoticComponent, Suspense } from 'react'

import Page from './page'

export type LazyComponent = LazyExoticComponent<
  ComponentType<Record<string, unknown>>
>

type BaseElementProps = {
  component?: ComponentType
  componentProps?: Record<string, unknown>
  id: string
  lazyComponent?: LazyComponent
  loadingComponent?: ComponentType
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
    loadingComponent: LoadingComponent,
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
    const fallback = LoadingComponent ? <LoadingComponent /> : null
    const render = () => (
      <Suspense fallback={fallback}>
        <LazyComponent {...componentProps} />
      </Suspense>
    )

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
