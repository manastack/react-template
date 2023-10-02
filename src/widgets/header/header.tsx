import { FC } from 'react'
import { withRenderLog } from '@manauser/react-render-log'
import { ZodTypeDef } from 'zod/lib/types'

import { MainQueryKey } from '@app/config'
import reactLogo from '@assets/images/react.svg'
import { PostsReadingDto, PostsReadingModel } from '@entities/post/posts.types'
import { useFetching } from '@shared/lib/api'

const Header: FC = () => {
  type QueryKey = [MainQueryKey]
  const { data: posts, isSuccess } = useFetching<
    QueryKey,
    PostsReadingModel,
    ZodTypeDef,
    PostsReadingDto
  >({
    queryKey: ['postsReading'],
  })

  return (
    <header className="flex h-[48px] flex-none items-center justify-between border-b-[1px] border-solid border-blue-300 bg-cyan-950 text-blue-300">
      <img src={reactLogo} alt="" className="m-4 h-4" />
      <div className="flex flex-1 items-center justify-center">
        {isSuccess ? `Posts: ${posts?.length ?? 0}` : 'Loading...'}
      </div>
    </header>
  )
}

export default withRenderLog(Header)
