
export class Module {
  get kinds () {
    return {
      enum: 4,
      enumMemer: 16,
      annotation: 64,
      class: 128,
      interface: 256,
      constructor: 512,
      property: 1024,
      method: 2048,
      accessor: 262144
    }
  }

  get github () {
    return 'https://github.com/exteranto/framework/blob/master/lib/'
  }

  get branch () {
    return this.params.branch
  }

  get package () {
    return this.params.package
  }

  get type () {
    return this.params.type
  }

  constructor (data, params) {
    this.data = data
    this.params = params
  }

  enums () {
    return this.kind(this.kinds.enum)
  }

  annotations () {
    return this.kind(this.kinds.annotation)
  }

  classes () {
    return this.kind(this.kinds.class)
  }

  interfaces () {
    return this.kind(this.kinds.interface)
  }

  /**
   * @protected
   */
  kind (kind) {
    return this.types().filter(t => parseInt(t.kind) === kind)
  }

  /**
   * @protected
   */
  types () {
    // Some memory cache.
    if (this._types !== undefined) {
      return this._types
    }

    return this._types = (this.data.children || [])
      // Flatten the exported module into types.
      .map(sub => sub.children || [])
      .reduce((carry, item) => carry.concat(item), [])
      // Filter exported types only.
      .filter(type => type.flags.isExported)
  }
}
