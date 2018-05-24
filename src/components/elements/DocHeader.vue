<template>
  <div>
    <h2 v-if="content.main" v-html="content.title" class="title is-4"></h2>

    <ul v-if="children.length">
      <li v-for="child in children">
        <a @click="scrollTo(child.id)">
          <code>
            <span v-if="child.static" class="tag is-primary">static</span>
            {{ child.name }}
            (<span v-if="child.content.block.body.parameters">{{ joinParams(child.content.block.body.parameters) }}</span>)
            :
            <span v-if="child.content.block.body.returns">{{ child.content.block.body.returns.type }}</span>
            <span v-else>any</span>
          </code>
        </a>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: ['content', 'children'],

  methods: {
    joinParams (params) {
      return params.map(p => p.type).join(', ')
    },

    scrollTo (id) {
      window.scrollTo(0, document.getElementById(id).offsetTop - 60)
    }
  }
}
</script>
