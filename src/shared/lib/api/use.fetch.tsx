import { useCallback } from 'react'
import { useQuery, UseQueryResult } from '@tanstack/react-query'
import { AxiosError, AxiosInstance, AxiosResponse } from 'axios'
import { ZodTypeAny } from 'zod'

import { ApiMessageGetterDict } from './api.model'
import { ErrorResponseParsing } from './error.response-parsing'
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
    messageGetterDict,
  })

  const queryFn = useCallback(async (): Promise<Model> => {
    onLoading()
    try {
      const response: AxiosResponse = await axiosInstance.get(url)

      try {
        const data = schema.parse(response.data) as Model
        onSuccess()
        return data
      } catch (error) {
        throw new ErrorResponseParsing('error by data parsing')
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        onError('error by data fetching (wrong url)')
        throw error
      }

      if (error instanceof ErrorResponseParsing) {
        onError(error.message)
        throw error
      }

      throw error
    }
  }, [axiosInstance, onError, onLoading, onSuccess, schema, url])

  return useQuery<Model, Error>([id], queryFn)
}
