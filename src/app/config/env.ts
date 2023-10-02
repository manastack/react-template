import { EnvType } from '@manauser/react-env'

const envList = [
  // 'VITE_MOCK_ENABLED', // - use before apiConfig
  // 'VITE_REACT_QUERY_DEVTOOLS_ENABLED', // - use before apiConfig
  'VITE_TIMESTAMP',
] as const

export type EnvKey = typeof envList[number]

export const envConfig: Record<EnvKey, EnvType> = {
  // VITE_MOCK_ENABLED: 'boolean',
  // VITE_REACT_QUERY_DEVTOOLS_ENABLED: 'boolean',
  VITE_TIMESTAMP: 'string',
}
