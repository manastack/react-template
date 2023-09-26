import { useCallback } from 'react'
import { useMutation } from '@tanstack/react-query'
import { UseMutationResult } from '@tanstack/react-query/src/types'
import { AxiosInstance, AxiosResponse } from 'axios'

import { ApiMessageGetterDict } from './api.model'
import { useApiListeners } from './use.api-listeners'
import { useAxiosInstance } from './use.axios-instance'

export type UseUpdatingProps = {
  customMockEnabled?: boolean
  messageGetterDict: ApiMessageGetterDict
  queryKey: string // todo: change to QueryKey
  url: string
}

export const useUpdating = <ReturningData = void, PostingData = void>({
  customMockEnabled = false,
  messageGetterDict,
  queryKey,
  url,
}: UseUpdatingProps): UseMutationResult<ReturningData, Error, PostingData> => {
  const axiosInstance: AxiosInstance = useAxiosInstance(customMockEnabled)

  const { onError, onLoading, onSuccess } = useApiListeners({
    messageGetterDict,
  })

  const queryFn: (p: PostingData) => Promise<ReturningData> = useCallback(
    async (postingData: PostingData): Promise<ReturningData> => {
      onLoading()
      try {
        const response: AxiosResponse<ReturningData> = await axiosInstance.put(
          url,
          postingData, // todo: add model to dto mapper
        )

        const responseData: ReturningData = response.data
        onSuccess()
        return responseData
      } catch (error) {
        onError('error by data posting')
        throw error
      }
    },
    [axiosInstance, onError, onLoading, onSuccess, url],
  )

  return useMutation<ReturningData, Error, PostingData>([queryKey], queryFn)
}
