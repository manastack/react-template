import { PropsWithChildren } from 'react'

import { LoggerContext } from './logger.context'
import { LoggerProviderProps } from './logger.model'

const LoggerProvider = <Status extends string>({
  children,
  logger = {},
}: PropsWithChildren<LoggerProviderProps<Status>>) => (
  <LoggerContext.Provider value={logger}>{children}</LoggerContext.Provider>
)

export default LoggerProvider
