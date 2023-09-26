import { useEffect, useState } from 'react'
import { AxiosInstance, AxiosResponse } from 'axios'

import { useAxiosInstance } from './use.axios-instance'

export type FetchContextValue<Model extends unknown> = {
  data: Model | null
  hasError: boolean
  isLoading: boolean
}

type UseFetchProps = {
  url: string | null
  customMockEnabled?: boolean
}

export const useFetch = <Dto, Model>({
  url,
  customMockEnabled = false,
}: UseFetchProps): FetchContextValue<Model> => {
  const [data, setData] = useState<Model | null>(null)
  const [hasError, setHasError] = useState<boolean>(false)
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const axiosInstance: AxiosInstance = useAxiosInstance(customMockEnabled)

  useEffect(() => {
    const fetchData = async (): Promise<Model | null> => {
      console.log('>>> FetchProvider.fetchData') // eslint-disable-line no-console
      const response: AxiosResponse<Dto> = await axiosInstance.get(url!)

      if (response.status !== 200) {
        // todo: add logger as provider-props:
        // todo: change console.error to error throw:
        console.error('>>> response.status', response.status) // eslint-disable-line no-console
        setHasError(true)
        return null
      }

      // todo: should add dto parsing to model:
      return (response.data as unknown) as Model
    }

    if (!url) return

    setIsLoading(true)
    setData(null)
    fetchData()
      .then((newData: Model | null) => {
        setHasError(false)
        setData(newData)
      })
      .catch(() => setHasError(true))
      .finally(() => setIsLoading(false))
  }, [axiosInstance, url])

  return { data, hasError, isLoading }
}
