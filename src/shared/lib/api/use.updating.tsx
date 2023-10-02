import { useCallback, useContext } from 'react'
import { MutationFunction, useMutation } from '@tanstack/react-query'
import { UseMutationResult } from '@tanstack/react-query/src/types'
import {
  AxiosError,
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
} from 'axios'
import { ZodType, ZodTypeDef } from 'zod'

import { ApiContext } from './api.context'
import { ApiItemConfigMutation } from './api.types'
import { ErrorDataParsing } from './error.data-parsing'
import { useApiListeners } from './use.api-listeners'
import { useAxiosInstance } from './use.axios-instance'

export type UseUpdatingProps<QueryKey extends (string | number)[]> = {
  callback?: () => void | Promise<void>
  urlParams?: (string | number)[]
  queryKey: QueryKey
}

export const useUpdating = <
  QueryKey extends (string | number)[], // todo - remove it
  RequestModel extends any,
  RequestDef extends ZodTypeDef,
  RequestDto extends any,
  ResponseModel extends any,
  ResponseDef extends ZodTypeDef,
  ResponseDto extends any
>({
  callback,
  urlParams = [],
  queryKey,
}: UseUpdatingProps<QueryKey>): UseMutationResult<
  ResponseModel,
  Error,
  RequestModel
> => {
  const { config: apiConfig, globalMockEnabled = false } = useContext(
    ApiContext,
  )

  const { getUrl, messageGetterDict, method, mock } = apiConfig[queryKey[0]]
  const responseSchema = apiConfig[queryKey[0]].responseSchema as ZodType<
    ResponseModel,
    ResponseDef,
    ResponseDto
  >

  const requestSchema = (apiConfig[queryKey[0]] as ApiItemConfigMutation)
    .requestSchema as ZodType<RequestDto, RequestDef, RequestModel>

  const axiosInstance: AxiosInstance = useAxiosInstance({
    mockEnabled: globalMockEnabled && !!mock?.enabled,
  })

  const { onError, onLoading, onSuccess } = useApiListeners({
    messageGetterDict,
  })

  const mutationFn: MutationFunction<ResponseModel, RequestModel> = useCallback(
    async (postingData: RequestModel): Promise<ResponseModel> => {
      // todo: take out to common api-hook
      onLoading()

      try {
        let data: RequestDto | null = null
        try {
          data = requestSchema.parse(postingData) as RequestDto
        } catch (error) {
          // todo: remake it without exception
          throw new ErrorDataParsing(
            'error by posting-data parsing (model to dto)',
          )
        }

        const response: AxiosResponse<ResponseDto> = await axiosInstance({
          data,
          method,
          url: getUrl(urlParams),
        } as AxiosRequestConfig)

        try {
          const modelData = responseSchema.parse(response.data) as ResponseModel
          callback?.()
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
          onError('error by data posting')
          throw error
        }

        if (error instanceof ErrorDataParsing) {
          onError(error.message)
          throw error
        }

        throw error
      }
    },
    [
      axiosInstance,
      callback,
      getUrl,
      method,
      onError,
      onLoading,
      onSuccess,
      requestSchema,
      responseSchema,
      urlParams,
    ],
  )

  return useMutation(mutationFn)
}
