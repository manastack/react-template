import tw, { styled } from 'twin.macro'

export const StyledModalContainer = styled.div`
  ${tw`fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50`}
  display: ${({ hidden }) => (hidden ? 'none' : 'flex')};
`

export const StyledModal = styled.div`
  ${tw`rounded-sm bg-white p-4 shadow-lg`}
`
