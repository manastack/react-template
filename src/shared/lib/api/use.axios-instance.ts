import axios, { AxiosInstance } from 'axios'

const serverTypes = ['back', 'mock'] as const
type ServerType = typeof serverTypes[number]
type AxiosInstances = Record<ServerType, AxiosInstance>

export const axiosInstances: AxiosInstances = serverTypes.reduce(
  (acc, cur: ServerType) => ({
    ...acc,
    [cur]: axios.create({
      headers: { 'Content-type': 'application/json; charset=UTF-8' },
    }),
  }),
  {} as AxiosInstances,
)

export const useAxiosInstance = (props: {
  mockEnabled: boolean
}): AxiosInstance =>
  props.mockEnabled ? axiosInstances.mock : axiosInstances.back
