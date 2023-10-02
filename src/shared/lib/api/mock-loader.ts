import { ApiConfig } from './api.types'

const loadMock = <MainQueryKey extends string>(
  apiConfig: ApiConfig<MainQueryKey>,
): Promise<unknown[]> =>
  Promise.all(
    (Object.keys(apiConfig) as MainQueryKey[]).map(async (key) =>
      apiConfig[key].mock?.enabled
        ? apiConfig[key].mock!.loader()
        : Promise.resolve(),
    ),
  )

export default loadMock
