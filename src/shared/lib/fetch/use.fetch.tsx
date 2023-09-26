import { useEffect, useState } from 'react'

export type FetchContextValue<D extends unknown> = {
  data: D | null
  hasError: boolean
  isLoading: boolean
}

export const useFetch = <D extends unknown>(
  url: string | null,
): FetchContextValue<D> => {
  const [data, setData] = useState<D | null>(null)
  const [hasError, setHasError] = useState<boolean>(false)
  const [isLoading, setIsLoading] = useState<boolean>(false)

  useEffect(() => {
    const fetchData = async (): Promise<void> => {
      console.log('>>> FetchProvider.fetchData') // eslint-disable-line no-console
      let response: Response | null = null

      try {
        response = await fetch(url!)
      } catch (error) {
        console.error('>>> error by fetch', error) // eslint-disable-line no-console
        setHasError(true)
        return
      }

      if (!response.ok) {
        console.error('>>> response.status', response.status) // eslint-disable-line no-console
        setHasError(true)
        return
      }

      // todo: should add a checking for the data (by model)

      try {
        const newData: D = await response.json()
        setData(newData)
      } catch (error) {
        console.error('>>> error by response.json()', error) // eslint-disable-line no-console
        setHasError(true)
      }
    }

    if (!url) return

    setIsLoading(true)
    setData(null)
    fetchData().finally(() => setIsLoading(false))
  }, [url])

  return { data, hasError, isLoading }
}
