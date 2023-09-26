type QueryStatus = 'loading' | 'error' | 'success'

type ApiMessage = Partial<Record<QueryStatus, string>>

export type ApiItemConfig = {
  getMessages: (p?: string | number) => ApiMessage
  getUrl: (...args: unknown[]) => string
  mock?: {
    enabled: boolean
    delay?: number
    loader: () => Promise<unknown>
  }
}
