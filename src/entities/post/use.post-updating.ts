import { UseMutationResult } from '@tanstack/react-query/src/types'

import { apiConfig } from '@app/config'
import { useUpdating, UseUpdatingProps } from '@shared/lib/api'
import { PostsItemModel } from './posts.model'

type UsePostUpdating = (p: {
  id: PostsItemModel['id']
}) => UseMutationResult<void, Error, PostsItemModel>

export const usePostUpdating: UsePostUpdating = ({ id }) => {
  const { getUrl, messageGetterDict, mock } = apiConfig.postUpdating
  const props: UseUpdatingProps = {
    customMockEnabled: mock?.enabled,
    messageGetterDict,
    url: getUrl(id),
  }

  return useUpdating<void, PostsItemModel>(props)
}
