import { EnvType } from '@manauser/react-env'

const envList = ['VITE_MOCK_ENABLED', 'VITE_TIMESTAMP'] as const

export type EnvKey = typeof envList[number]

export const envConfig: Record<EnvKey, EnvType> = {
  VITE_MOCK_ENABLED: 'boolean',
  VITE_TIMESTAMP: 'string',
}
