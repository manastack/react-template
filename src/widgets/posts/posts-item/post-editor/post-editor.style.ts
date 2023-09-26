import { css } from '@emotion/react'
import styled from '@emotion/styled'
import tw from 'twin.macro'

import { StyledPostsItem, StyledPostsItemBody } from '../posts-item.style'

export const StyledPostEditor = styled.form`
  ${StyledPostsItem};
  ${tw`m-0 bg-blue-900 text-blue-300`};
`

const inputStyle = css`
  ${tw`border-none bg-transparent p-0 text-blue-300 outline-none hover:bg-transparent`};
`

export const StyledPostEditorTitle = styled.input`
  ${StyledPostsItem};
  ${inputStyle};
`

export const StyledPostEditorBody = styled.textarea`
  ${StyledPostsItemBody};
  ${inputStyle}
`

export const StyledToolbar = tw.div`flex items-center justify-end mr-8 gap-2`
