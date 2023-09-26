import { css } from '@emotion/react'

export const GlobalStyles = css`
  html {
    box-sizing: border-box;
    height: 100%;
  }

  *,
  *::before,
  *::after {
    box-sizing: inherit;
  }

  body {
    height: 100%;
    margin: 0;
    padding: 0;
  }

  #root {
    position: relative;

    height: 100%;
  }
`
