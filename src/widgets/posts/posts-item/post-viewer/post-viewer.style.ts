import tw, { styled } from 'twin.macro'

import {
  StyledPostsItem,
  StyledPostsItemBody,
  StyledPostsItemTitle,
  StyledPostsItemToolbar,
} from '../posts-item.style'

export const StyledPostViewer = styled.div`
  ${StyledPostsItem};
  ${tw`text-gray-400 hover:bg-black hover:text-white`};
`

export const StyledPostViewerTitle = styled.p`
  ${StyledPostsItemTitle};
`

export const StyledPostViewerBody = styled.p`
  ${StyledPostsItemBody};
  height: 72px;
  margin-bottom: 8px;
`

export const StyledPostViewerToolbar = styled.div`
  ${StyledPostsItemToolbar};
`
