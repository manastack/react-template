import { useEffect, useState } from 'react'
import { AxiosInstance, AxiosResponse } from 'axios'
import { ZodTypeAny } from 'zod'

import { useAxiosInstance } from './use.axios-instance'

export type FetchContextValue<Model extends unknown> = {
  data: Model | null
  hasError: boolean
  isLoading: boolean
}

export type UseFetchProps = {
  customMockEnabled?: boolean
  schema: ZodTypeAny
  url: string | null
}

// todo: remake w/ react-query:
export const useFetch = <Model extends unknown>({
  customMockEnabled = false,
  schema,
  url,
}: UseFetchProps): FetchContextValue<Model> => {
  const [data, setData] = useState<Model | null>(null)
  const [hasError, setHasError] = useState<boolean>(false)
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const axiosInstance: AxiosInstance = useAxiosInstance(customMockEnabled)

  useEffect(() => {
    const fetchData = async (): Promise<Model | null> => {
      const response: AxiosResponse<Model> = await axiosInstance.get(url!)

      if (response.status !== 200) {
        // todo: add logger as provider-props:
        // todo: change console.error to error throw:
        console.error('>>> response.status', response.status) // eslint-disable-line no-console
        setHasError(true)
        return null
      }

      return schema.parse(response.data) as Model
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
  }, [axiosInstance, schema, url])

  return { data, hasError, isLoading }
}
