import { FC } from 'react'
import { withRenderLog } from '@manauser/react-render-log'

import { ButtonSymbol } from '@shared/ui/button-symbol'
import { Modal, useModal } from '@shared/ui/modal'
import { PostEditor } from '@widgets/post-list/posts-item'

const PostAdder: FC = () => {
  const { hidden, setHidden } = useModal()

  return (
    <>
      <ButtonSymbol
        className="m-4 text-[0.7rem] !text-red-500"
        handleClick={() => setHidden(false)}
        label="add"
        renderLogId="add-post"
      />
      {!hidden && (
        <Modal renderLogId="add-post">
          <div className="flex items-center justify-center">
            <PostEditor
              closePostEditor={() => setHidden(true)}
              {...{ body: '', name: '', userId: 1 }}
            />
          </div>
        </Modal>
      )}
    </>
  )
}

export default withRenderLog(PostAdder)
