
export default {
  computed: {
    githubBase () {
      return `https://github.com/exteranto/framework/blob/master/lib/${this.$route.params.package}/src/`
    },

    sourceFilePath () {
      const source = this.data.sources[0]

      if (!/^\//.test(source.fileName)) {
        return source.fileName
      }

      if (!/node_modules\/@exteranto/.test(source.fileName)) {
        return false
      }

      return source.fileName
        .replace(/^.*\/@exteranto\/(\w+)/, '../../$1')
        .replace('types', 'src')
        .replace('.d.ts', '.ts')
    },

    sourceFileName () {
      return this.sourceFilePath.split('/').pop()
    },

    githubUrl () {
      if (!this.sourceFilePath) {
        return null
      }

      return `${this.githubBase}${this.sourceFilePath}#L${this.data.sources[0].line}`
    }
  }
}
