<template>
  <ul class="menu-list">
    <li v-for="item in items">
      <a @click="scrollTo(item.id)" v-html="item.title"></a>
    </li>
  </ul>
</template>

<script>
export default {
  props: ['resource'],

  data () {
    return {
      items: []
    }
  },

  mounted () {
    this.$store.dispatch('loadDocs', { name: this.resource })
      .then(content => this.items = content.sections.filter(s => s.main))
  },

  methods: {
    scrollTo (id) {
      window.scrollTo(0, document.getElementById(id).offsetTop - 60)
    }
  }
}
</script>
