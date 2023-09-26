import { ComponentType } from 'react'
import {
  closeSnackbar,
  SnackbarAction,
  SnackbarOrigin,
  SnackbarProvider,
  SnackbarProviderProps,
} from 'notistack'

import { ButtonSymbol } from '@shared/ui/button-symbol'

type WithSnackbarProvider = <Props extends {}>(
  this: SnackbarProviderProps,
  Component: ComponentType<Props>,
) => ComponentType<Props>

export const withSnackbarProvider: WithSnackbarProvider = function <
  Props extends {}
>(
  this: SnackbarProviderProps,
  Component: ComponentType<Props>,
): ComponentType<Props> {
  const ownSnackbarProviderProps: SnackbarProviderProps = {
    ...this,
    action: ((id) => (
      <ButtonSymbol action={() => closeSnackbar(id)} label="&times;" />
    )) as SnackbarAction,
    anchorOrigin: {
      horizontal: 'right',
      vertical: 'bottom',
    } as SnackbarOrigin,
    dense: true,
    hideIconVariant: true,
    maxSnack: 7,
  }

  return (props: Props) => (
    <SnackbarProvider {...ownSnackbarProviderProps}>
      <Component {...props} />
    </SnackbarProvider>
  )
}
