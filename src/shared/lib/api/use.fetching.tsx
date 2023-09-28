import { useCallback } from 'react'
import { useQuery, UseQueryResult } from '@tanstack/react-query'
import { AxiosError, AxiosInstance, AxiosResponse } from 'axios'
import { ZodType } from 'zod'
import { ZodTypeDef } from 'zod/lib/types'

import { ApiMessageGetterDict } from './api.model'
import { ErrorResponseParsing } from './error.response-parsing'
import { useApiListeners } from './use.api-listeners'
import { useAxiosInstance } from './use.axios-instance'

export type UseFetchingProps<
  Model extends any,
  Def extends ZodTypeDef = ZodTypeDef,
  Dto = Model
> = {
  customMockEnabled?: boolean
  id: string // todo: change to QueryKey
  messageGetterDict: ApiMessageGetterDict
  schema: ZodType<Model, Def, Dto>
  url: string
}

export const useFetching = <
  Model extends any,
  Def extends ZodTypeDef = ZodTypeDef,
  Dto = Model
>({
  customMockEnabled = false,
  id,
  messageGetterDict,
  schema,
  url,
}: UseFetchingProps<Model, Def, Dto>): UseQueryResult<Model> => {
  const axiosInstance: AxiosInstance = useAxiosInstance(customMockEnabled)

  const { onError, onLoading, onSuccess } = useApiListeners({
    messageGetterDict,
  })

  const queryFn = useCallback(async (): Promise<Model> => {
    onLoading()
    try {
      const response: AxiosResponse = await axiosInstance.get(url)

      try {
        const data = schema.parse(response.data)
        onSuccess()
        return data
      } catch (error) {
        throw new ErrorResponseParsing('error by data parsing')
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        onError('error by data fetching')
        throw error
      }

      if (error instanceof ErrorResponseParsing) {
        onError(error.message)
        throw error
      }

      throw error
    }
  }, [axiosInstance, onError, onLoading, onSuccess, schema, url])

  return useQuery<Model>([id], queryFn)
}
