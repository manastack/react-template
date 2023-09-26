import { EnvType } from '@manauser/react-env'

const envList = ['VITE_TIMESTAMP'] as const

export type EnvKey = typeof envList[number]

export const envConfig: Record<EnvKey, EnvType> = {
  VITE_TIMESTAMP: 'string',
}
