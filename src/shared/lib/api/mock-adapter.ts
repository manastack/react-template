import AxiosMockAdapter from 'axios-mock-adapter'

import { axiosInstances } from './use.axios-instance'

export const mockAdapter = new AxiosMockAdapter(axiosInstances.mock)
