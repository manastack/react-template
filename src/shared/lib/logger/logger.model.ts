export type LogAction = (p: { id: string | number; message?: string }) => void

export type Logger<Status extends string> = Partial<Record<Status, LogAction[]>>

export type LoggerContextValue<Status extends string> = Logger<Status>

export type LoggerProviderProps<Status extends string> = {
  logger: Logger<Status>
}
