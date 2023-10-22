import { NavLink } from 'react-router-dom'
import styled from '@emotion/styled'
import tw from 'twin.macro'

export const StyledHeader = styled.div`
  ${tw`flex h-8 flex-none items-center justify-center gap-6 bg-gray-900`};

  height: 64px;

  .red-button {
    color: red;

    &:hover,
    &:focus {
      background-color: #143131 !important;
    }

    &:disabled {
      color: #ccc;
      &:hover,
      &:focus {
        background-color: unset;
      }
    }
  }
`

export const StyledNavLink = styled(NavLink)`
  ${tw`text-white no-underline transition-colors duration-300 ease-in-out hover:text-blue-300 focus:text-blue-300`};

  font-size: 1rem;

  &.active {
    ${tw`cursor-default text-blue-300 no-underline`}
  }
`
