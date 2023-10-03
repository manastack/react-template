export const colorConsoleLog = (props: {
  color: string
  message: string
}): void => {
  const { color, message } = props
  console.log(`%c • ${message}`, `color: ${color}`) // eslint-disable-line no-console
}
