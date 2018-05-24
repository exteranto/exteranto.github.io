<template>
  <pre style="padding: 0"><code ref="block" :class="lang || 'typescript'">{{ snippet }}</code></pre>
</template>

<script>
import hljs from 'highlight.js'

export default {
  props: ['lang', 'code'],

  data () {
    return {
      snippet: ''
    }
  },

  mounted () {
    this.loadCode()
  },

  methods: {
    loadCode () {
      if (!this.code.match(/^s3:/)) {
        return this.highlight(this.code)
      }

      this.$store.dispatch('loadSnippet', { name: this.code })
        .then(snippet => this.highlight(snippet))
    },

    highlight (snippet) {
      this.snippet = snippet

      this.$nextTick(() => hljs.highlightBlock(this.$refs.block))
    }
  }
}
</script>
