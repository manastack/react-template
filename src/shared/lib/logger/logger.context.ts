import { createContext } from 'react'

import { LoggerContextValue } from './logger.model'

export const LoggerContext = (<Status extends string>() =>
  createContext<LoggerContextValue<Status>>({}))()
