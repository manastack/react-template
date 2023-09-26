import { css } from '@emotion/react'
import tw from 'twin.macro'

export const GlobalStyles = css`
  html {
    ${tw`box-border h-full`}
  }

  *,
  *::before,
  *::after {
    box-sizing: inherit;
  }

  body {
    ${tw`m-0 h-full bg-gray-800 p-0 font-sans text-white`}
  }

  #root {
    ${tw`relative h-full`}
  }
`
