import { useCallback, useContext } from 'react'
import { QueryFunction, useQuery, UseQueryResult } from '@tanstack/react-query'
import {
  AxiosError,
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
} from 'axios'
import { ErrorDataParsing } from 'src/shared/lib/api/error.data-parsing'
import { ZodType, ZodTypeDef } from 'zod'

import { ApiContext } from './api.context'
import { useApiListeners } from './use.api-listeners'
import { useAxiosInstance } from './use.axios-instance'

export type UseFetchingProps<QueryKey extends (string | number)[]> = {
  urlParams?: (string | number)[]
  queryKey: QueryKey
}

export const useFetching = <
  QueryKey extends (string | number)[],
  ResponseModel extends any,
  ResponseDef extends ZodTypeDef = ZodTypeDef,
  ResponseDto = ResponseModel
>({
  urlParams = [],
  queryKey,
}: UseFetchingProps<QueryKey>): UseQueryResult<ResponseModel> => {
  const { config: apiConfig, globalMockEnabled = false } = useContext(
    ApiContext,
  )

  const { getUrl, messageGetterDict, method, mock } = apiConfig[queryKey[0]]
  const responseSchema = apiConfig[queryKey[0]].responseSchema as ZodType<
    ResponseModel,
    ResponseDef,
    ResponseDto
  >

  const axiosInstance: AxiosInstance = useAxiosInstance({
    mockEnabled: globalMockEnabled && !!mock?.enabled,
  })

  const { onError, onLoading, onSuccess } = useApiListeners({
    messageGetterDict,
  })

  const queryFn: QueryFunction<
    ResponseModel,
    QueryKey
  > = useCallback(async (): Promise<ResponseModel> => {
    // todo: take out to common api-hook
    onLoading()

    try {
      const response: AxiosResponse<ResponseDto> = await axiosInstance({
        method,
        url: getUrl(urlParams),
      } as AxiosRequestConfig)

      try {
        const modelData = responseSchema.parse(response.data) as ResponseModel

        onSuccess()
        return modelData
      } catch (error) {
        // todo: remake it without exception
        throw new ErrorDataParsing(
          'error by response-data parsing (dto to model)',
        )
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        onError('error by data fetching')
        throw error
      }

      if (error instanceof ErrorDataParsing) {
        onError(error.message)
        throw error
      }

      throw error
    }
  }, [
    axiosInstance,
    getUrl,
    method,
    onError,
    onLoading,
    onSuccess,
    responseSchema,
    urlParams,
  ])

  return useQuery<ResponseModel, Error, ResponseModel, QueryKey>(
    queryKey,
    queryFn,
  )
}
