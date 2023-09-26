import { useCallback } from 'react'
import { useQuery, UseQueryResult } from '@tanstack/react-query'
import { AxiosInstance, AxiosResponse } from 'axios'
import { ZodTypeAny } from 'zod'

import { ApiMessageGetterDict } from './api.model'
import { useApiListeners } from './use.api-listeners'
import { useAxiosInstance } from './use.axios-instance'

export type UseFetchProps = {
  customMockEnabled?: boolean
  id: string
  messageGetterDict: ApiMessageGetterDict
  schema: ZodTypeAny // todo: change to zod schema
  url: string
}

export const useFetch = <Model extends unknown>({
  customMockEnabled = false,
  id,
  messageGetterDict,
  schema,
  url,
}: UseFetchProps): UseQueryResult<Model, Error> => {
  const axiosInstance: AxiosInstance = useAxiosInstance(customMockEnabled)

  const { onError, onLoading, onSuccess } = useApiListeners({
    id,
    messageGetterDict,
  })

  const fetchData = useCallback(
    async (fetchProps: {
      axiosInstance: AxiosInstance
      onError: (message?: string) => void
      url: string
    }): Promise<AxiosResponse> => {
      try {
        const response: AxiosResponse = await fetchProps.axiosInstance.get(
          fetchProps.url,
        )

        if (response.status !== 200) {
          const errorMessage = `Error by data fetching (wrong response status: ${response.status})`
          fetchProps.onError(errorMessage)
          throw new Error(errorMessage)
        }

        return response
      } catch (error) {
        fetchProps.onError('Error by data fetching (wrong url)')
        throw error
      }
    },
    [],
  )

  const queryFn = useCallback(async (): Promise<Model> => {
    onLoading()
    const response: AxiosResponse = await fetchData({
      axiosInstance,
      onError,
      url,
    })

    try {
      const data = schema.parse(response.data) as Model
      onSuccess()
      return data
    } catch (error) {
      onError('Error by data parsing')
      throw error
    }
  }, [axiosInstance, fetchData, onError, onLoading, onSuccess, schema, url])

  return useQuery<Model, Error>([id], queryFn)
}
