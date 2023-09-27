import { useCallback } from 'react'
import { MutationFunction, useMutation } from '@tanstack/react-query'
import { UseMutationResult } from '@tanstack/react-query/src/types'
import { AxiosInstance, AxiosResponse } from 'axios'

import { ApiMessageGetterDict } from './api.model'
import { useApiListeners } from './use.api-listeners'
import { useAxiosInstance } from './use.axios-instance'

export type UseUpdatingProps = {
  callback?: () => void | Promise<void>
  customMockEnabled?: boolean
  messageGetterDict: ApiMessageGetterDict
  url: string
}

export const useUpdating = <ReturningData = void, PostingData = void>({
  callback,
  customMockEnabled = false,
  messageGetterDict,
  url,
}: UseUpdatingProps): UseMutationResult<ReturningData, Error, PostingData> => {
  const axiosInstance: AxiosInstance = useAxiosInstance(customMockEnabled)

  const { onError, onLoading, onSuccess } = useApiListeners({
    messageGetterDict,
  })

  const queryFn: MutationFunction<ReturningData, PostingData> = useCallback(
    async (postingData: PostingData): Promise<ReturningData> => {
      onLoading()
      try {
        const response: AxiosResponse<ReturningData> = await axiosInstance.put(
          url,
          postingData, // todo: add model to dto mapper
        )

        const responseData: ReturningData = response.data
        onSuccess()
        callback?.()
        return responseData
      } catch (error) {
        onError('error by data posting')
        throw error
      }
    },
    [axiosInstance, callback, onError, onLoading, onSuccess, url],
  )

  return useMutation<ReturningData, Error, PostingData>(queryFn)
}
