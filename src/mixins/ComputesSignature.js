
export default {
  methods: {
    type (signature) {
      if (signature.type === 'union') {
        return signature.types
          .map(item => this.type(item))
          .join(' | ')
      }

      if (signature.type === 'array') {
        return this.type(signature.elementType) + '[]'
      }

      if (signature.type === 'reference') {
        let name = signature.name

        if (signature.id) {
          name = `<a href="/api/${this.$route.params.branch}/${this.$route.params.package}/${signature.name}" target="_blank">${name}</a>`
        }

        if (signature.typeArguments) {
          name = `${name}&lt;${signature.typeArguments.map(a => this.type(a)).join(', ')}&gt;`
        }

        return name
      }

      if (signature.type === 'reflection') {
        return this.buildReflectionType(signature.declaration.signatures)
      }

      if (signature.type === 'typeParameter' && signature.constraint) {
        return `${signature.name} extends ${this.type(signature.constraint)}`
      }

      return signature.name || 'any'
    },

    buildReflectionType (signatures) {
      if (signatures === undefined) {
        return 'object'
      }

      const params = (signatures[0].parameters || [])
        .map(item => `${item.name}: ${this.type(item.type)}`)
        .join(', ')

      return `(${params}) => ${this.type(signatures[0].type)}`
    }
  }
}
