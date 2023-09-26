import { ApiItemConfig } from './api.model'

const loadMock = (
  apiConfig: Record<string, ApiItemConfig>,
): Promise<unknown[]> =>
  Promise.all(
    Object.keys(apiConfig).map(async (key) =>
      apiConfig[key].mock?.enabled
        ? apiConfig[key].mock!.loader()
        : Promise.resolve(),
    ),
  )

export default loadMock
