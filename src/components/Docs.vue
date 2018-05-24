<template>
  <div class="container-fluid">
    <div class="columns is-gapless">
      <div class="column is-2">
        <side-menu />
      </div>

      <div class="column is-10">
        <json-doc :content="content" />
      </div>
    </div>
  </div>
</template>

<script>
import JsonDoc from '@/components/elements/JsonDoc'
import SideMenu from '@/components/elements/SideMenu'

export default {
  components: { JsonDoc, SideMenu },

  data () {
    return {
      content: { sections: [] }
    }
  },

  mounted () {
    this.loadContent(this.$route)
  },

  beforeRouteUpdate (to, from, next) {
    this.loadContent(to).then(() => next())
  },

  methods: {
    loadContent (route) {
      return this.$store.dispatch('loadDocs', { name: route.params.name })
        .then(content => this.content = content)
    }
  }
}
</script>
