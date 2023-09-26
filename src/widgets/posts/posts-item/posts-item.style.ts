import tw, { css } from 'twin.macro'

export const StyledPostsItem = css`
  ${tw`flex flex-col items-stretch border-b border-black p-4`}
`

export const StyledPostsItemTitle = css`
  ${tw`mb-2 text-3xl`}
`

export const StyledPostsItemBody = css`
  ${tw`text-[1rem] leading-normal`}
`

export const StyledPostsItemToolbar = css`
  ${tw`mr-8 flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100`}
`
