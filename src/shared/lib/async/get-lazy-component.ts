import { ComponentType, lazy, LazyExoticComponent } from 'react'

const isDev = import.meta.env.MODE === 'development'

export const getLazyComponent = (
  path: string,
  delay = 1000,
): LazyExoticComponent<ComponentType> => {
  if (isDev) {
    return lazy(
      () =>
        new Promise((res) => {
          setTimeout(() => res(import(path)), delay)
        }),
    )
  }

  return lazy(() => import(path))
}
