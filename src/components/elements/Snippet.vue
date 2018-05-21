<template>
  <pre style="padding: 0"><code ref="block" :class="lang || 'nohighlight'"><slot /></code></pre>
</template>

<script>
import hljs from 'highlight.js'

export default {
  props: ['lang'],

  mounted () {
    this.$nextTick(() => {
      hljs.highlightBlock(this.$refs.block)
    })
  }
}
</script>
