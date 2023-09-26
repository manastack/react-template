import { useEnvContext } from '@manauser/react-env'
import axios, { AxiosInstance } from 'axios'

import type { EnvKey } from '@app/config'

const serverTypes = ['back', 'mock'] as const
type ServerType = typeof serverTypes[number]
type AxiosInstances = Record<ServerType, AxiosInstance>

export const axiosInstances: AxiosInstances = serverTypes.reduce(
  (acc, cur: ServerType) => ({
    ...acc,
    [cur]: axios.create({
      headers: { 'Content-type': 'application/json' },
    }),
  }),
  {} as AxiosInstances,
)

export const useAxiosInstance = (
  customMocksEnabled: boolean,
): AxiosInstance => {
  const { VITE_MOCK_ENABLED: commonMockEnabled } = useEnvContext<EnvKey>()

  return commonMockEnabled && customMocksEnabled
    ? axiosInstances.mock
    : axiosInstances.back
}
