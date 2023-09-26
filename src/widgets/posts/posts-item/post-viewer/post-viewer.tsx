import { FC, memo } from 'react'
import {
  PropsWithEmotionNaming,
  withEmotionNaming,
} from '@manauser/react-emotion-naming'
import { withRenderLog } from '@manauser/react-render-log'

import { PostsItemModel } from '@entities/post'
import { ButtonSymbol } from '@shared/ui/button-symbol'

import {
  StyledPostViewer,
  StyledPostViewerBody,
  StyledPostViewerTitle,
  StyledPostViewerToolbar,
} from './post-viewer.style'

type Props = PostsItemModel & {
  handleEdit: (id: PostsItemModel['id']) => void
}

const PostViewer: FC<PropsWithEmotionNaming<Props>> = ({
  body,
  handleEdit,
  id,
  setClassName,
  title,
}) => (
  <StyledPostViewer className={setClassName('PostViewer', 'group')}>
    <StyledPostViewerTitle className={setClassName('PostViewerTitle')}>
      {title}
    </StyledPostViewerTitle>
    <StyledPostViewerBody className={setClassName('PostViewerBody')}>
      {body}
    </StyledPostViewerBody>
    <StyledPostViewerToolbar className={setClassName('PostViewerToolbar')}>
      <ButtonSymbol
        className="text-[0.7rem] !text-red-500"
        handleClick={() => handleEdit(id)}
        label="edit"
        renderLogId={`post-viewer.edit.${id}`}
      />
    </StyledPostViewerToolbar>
  </StyledPostViewer>
)

export default memo(withEmotionNaming(withRenderLog(PostViewer)))
