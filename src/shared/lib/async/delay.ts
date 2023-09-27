export const withDelay = <D extends unknown>(
  data: D,
  timeout: number,
): (() => Promise<D>) => () =>
  new Promise((resolve) => {
    setTimeout(() => resolve(data), timeout)
  })

export const delay = (timeout: number): Promise<void> =>
  new Promise((resolve) => {
    setTimeout(resolve, timeout)
  })
