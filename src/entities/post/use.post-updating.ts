import { UseMutationResult } from '@tanstack/react-query/src/types'

import { apiConfig } from '@app/config'
import { useUpdating, UseUpdatingProps } from '@shared/lib/api'
import { PostsItemDto, PostsItemModel } from './posts.model'

type UsePostUpdating = (p: {
  callback?: () => void | Promise<void>
  id: PostsItemModel['id']
}) => UseMutationResult<void, Error, PostsItemDto>

export const usePostUpdating: UsePostUpdating = ({ callback, id }) => {
  const { getUrl, messageGetterDict, mock } = apiConfig.postUpdating
  const props: UseUpdatingProps = {
    callback,
    customMockEnabled: mock?.enabled,
    messageGetterDict,
    url: getUrl(id),
  }

  return useUpdating<void, PostsItemDto>(props)
}

export const parsePostsItemModelToDto = ({
  name,
  ...restPostItem
}: PostsItemModel): PostsItemDto => ({ title: name, ...restPostItem })
