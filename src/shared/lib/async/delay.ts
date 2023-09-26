export const withDelay = <D extends unknown>(
  data: D,
  timeout: number,
): (() => Promise<D>) => () =>
  new Promise((resolve) => {
    setTimeout(() => resolve(data), timeout)
  })
