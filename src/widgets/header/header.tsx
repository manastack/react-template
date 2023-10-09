import { FC, useState } from 'react'
import { withRenderLog } from '@manauser/react-render-log'
import { ZodTypeDef } from 'zod/lib/types'

import { MainQueryKey } from '@app/config'
import reactLogo from '@assets/images/react.svg'
import { PostsReadingDto, PostsReadingModel } from '@entities/post/posts.types'
import { useFetching } from '@shared/lib/api'
import { ButtonSymbol } from '@shared/ui/button-symbol'
import { Modal } from '@shared/ui/modal'

const Header: FC = () => {
  type QueryKey = [MainQueryKey]
  const { data: posts, isSuccess } = useFetching<
    QueryKey,
    PostsReadingModel,
    ZodTypeDef,
    PostsReadingDto
  >({
    queryKey: [MainQueryKey.postsReading],
  })

  const [hidden, setHidden] = useState<boolean>(true)

  return (
    <header className="flex h-[48px] flex-none items-center justify-between border-b-[1px] border-solid border-black bg-cyan-950 text-blue-300">
      <img src={reactLogo} alt="" className="m-4 h-4" />
      <div className="flex flex-1 items-center justify-center">
        {isSuccess ? `Posts: ${posts?.length ?? 0}` : 'Loading...'}
      </div>
      <div>
        <ButtonSymbol
          className="m-4 text-[0.7rem] !text-red-500"
          handleClick={() => setHidden(false)}
          label="add"
          renderLogId="add-post"
        />
        <Modal renderLogId="add-post" {...{ hidden, setHidden }}>
          <div className="flex items-center justify-center p-4">123</div>
        </Modal>
      </div>
    </header>
  )
}

export default withRenderLog(Header)
