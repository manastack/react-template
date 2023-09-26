import { useContext } from 'react'

import { LoggerContext } from './logger.context'
import { LoggerContextValue } from './logger.model'

export const useLogger = <Status extends string>() =>
  useContext<LoggerContextValue<Status>>(LoggerContext)
