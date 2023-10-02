export class ErrorDataParsing extends Error {
  constructor(message: string) {
    super(message)

    Object.setPrototypeOf(this, ErrorDataParsing.prototype)
  }
}
