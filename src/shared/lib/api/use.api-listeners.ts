import { useCallback } from 'react'
import { QueryStatus } from '@tanstack/react-query'

import { Logger, useLogger } from '@shared/lib/logger'
import { ApiMessageGetterDict } from './api.model'

type ApiListener = (details?: string) => void

type UseApiListeners = (props: {
  id: string
  messageGetterDict: ApiMessageGetterDict
}) => {
  onError: ApiListener
  onLoading: ApiListener
  onSuccess: ApiListener
}

export const useApiListeners: UseApiListeners = ({ id, messageGetterDict }) => {
  const logger: Logger<QueryStatus> = useLogger<QueryStatus>()

  const onEvent = useCallback(
    (status: QueryStatus, details?: string) => {
      ;(logger[status] || []).forEach((logAction) => {
        messageGetterDict[status] &&
          logAction({ id, message: messageGetterDict[status]!(details) })
      })
    },
    [id, logger, messageGetterDict],
  )

  return {
    onError: (details?: string) => onEvent('error', details),
    onLoading: () => onEvent('loading'),
    onSuccess: () => onEvent('success'),
  }
}
