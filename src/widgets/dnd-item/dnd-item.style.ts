import styled from '@emotion/styled'
import tw from 'twin.macro'

type Props = {
  isDragging: boolean
}

export const StyledDndItem = styled.div<Props>`
  ${tw`mb-2 w-[200px] cursor-grab rounded-sm bg-blue-500 px-4 py-8`};
  ${({ isDragging }) => isDragging && tw`bg-blue-400 shadow-lg`};
`
