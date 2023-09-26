export class MockStore<Data> {
  _data: Data | null = null

  constructor(data: Data | null) {
    this._data = data
  }

  set data(data: Data | null) {
    this._data = data
  }

  get data(): Data | null {
    return this._data
  }
}
