<template>
  <div class="code-container">
    <span class="icon code-copy" @click="copyCode()">
      <i class="fa fa-copy"></i>
    </span>

    <span :class="['copied-notification', showPopup ? 'is-active' : '']">Snippet copied!</span>

    <pre style="padding: 0"><code ref="block" :class="lang || 'typescript'">{{ snippet }}</code></pre>
    <input type="hidden" ref="mock" :value="snippet">
  </div>
</template>

<script>
import hljs from 'highlight.js'

export default {
  props: ['lang', 'code'],

  data () {
    return {
      snippet: '',
      showPopup: false
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
    },

    copyCode () {
      this.showPopup = true

      this.$refs.mock.setAttribute('type', 'text')
      this.$refs.mock.select()
      document.execCommand('copy')
      this.$refs.mock.setAttribute('type', 'hidden')

      setTimeout(() => this.showPopup = false, 1500)
    }
  }
}
</script>

<style lang="sass" scoped>
@import ../../assets/sass/variables

.code-container
  position: relative

.code-copy
  border-radius: 2px
  border: 1px solid transparent
  color: $primary
  cursor: pointer
  position: absolute
  right: 0
  transition: .2s ease border-color

  &:hover
    border-color: $primary

.copied-notification
  border-radius: 2px
  border: 1px solid $primary
  color: $primary
  opacity: 0
  font-family: Fira Mono
  font-size: 13px
  padding: 1.5px 5px
  position: absolute
  right: 30px
  transition: .2s ease opacity

  &.is-active
    opacity: 1
</style>
