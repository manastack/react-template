import tw, { styled } from 'twin.macro'

export const StyledButtonSymbol = styled.button`
  ${tw`cursor-pointer border-none bg-none text-[1,5rem] font-bold text-inherit opacity-50 transition-opacity duration-200 hover:opacity-100 focus:opacity-100`}

  &:disabled {
    cursor: not-allowed;

    opacity: 0.3;

    &:hover,
    &:focus {
      opacity: 0.3;
    }
  }
`
