import { Module } from './Module'

export class Type extends Module {
  accessors () {
    return this.kind(this.kinds.accessor)
  }

  properties () {
    return this.kind(this.kinds.property)
  }

  constructors () {
    return this.kind(this.kinds.constructor)
  }

  methods () {
    return this.kind(this.kinds.method)
  }

  enumMembers () {
    return this.kind(this.kinds.enumMemer)
  }

  comment () {
    return this.data.comment || {}
  }

  sourceFileName () {
    if (!this.sourcePath()) {
      return
    }

    return this.sourcePath().split('/').pop()
  }

  githubUrl () {
    if (!this.sourcePath()) {
      return
    }

    return `${this.github}${this.package}/src/${this.sourcePath()}#L${this.data.sources[0].line}`
  }

  refer (type) {
    if (type.id) {
      return `<a href="/api/${this.branch}/${this.package}/${type.name}" target="_blank">${type.name}</a>`
    }

    return type.name
  }

  toString () {
    let name = this.data.name

    if (this.data.typeParameter) {
      name += `&lt;${this.data.typeParameter.map(p => this.resolveGeneric(p)).join(', ')}&gt;`
    }

    if (this.data.extendedTypes) {
      name += ` extends ${this.resolveInheritance(this.data.extendedTypes)}`
    }

    if (this.data.implementedTypes) {
      name += ` implements ${this.resolveInheritance(this.data.implementedTypes)}`
    }

    return name
  }

  /**
   * @private
   */
  resolveGeneric (param) {
    return param.type ? `${param.name} extends ${this.refer(param.type)}` : param.name
  }

  /**
   * @private
   */
  resolveInheritance (type) {
    if (Array.isArray(type)) {
      return type.map(t => this.resolveInheritance(t)).join(', ')
    }

    return type.typeArguments ? `${this.refer(type)}&lt;${type.typeArguments.map(t => t.name).join(', ')}&gt;` : this.refer(type)
  }

  /**
   * @private
   */
  sourcePath () {
    // Some memory cache.
    if (this._sourcePath !== undefined) {
      return this._sourcePath
    }

    const source = this.data.sources[0]

    if (!/^\//.test(source.fileName)) {
      return this._sourcePath = source.fileName
    }

    if (!/node_modules\/@exteranto/.test(source.fileName)) {
      return
    }

    return this._sourcePath = source.fileName
      .replace(/^.*\/@exteranto\/(\w+)/, '../../$1')
      .replace('types', 'src')
      .replace('.d.ts', '.ts')
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
      .filter(type => type.flags.isExported)
  }
}
