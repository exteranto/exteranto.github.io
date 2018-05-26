<template>
  <div>
    <div class="columns is-gapless is-multiline content has-no-margin">
      <div class="column is-6-widescreen is-12-desktop">
        <header class="section is-medium is-code-description">
          <h1 class="title is-3">{{ content.title }}</h1>

          <ul>
            <li v-for="item in menu">
              <a @click="scrollTo(item.id)" v-html="item.title"></a>
            </li>
          </ul>

          <hr>

          <small>
            Note that all docs are also available in JSON format.
            <a :href="s3" target="_blank">{{ s3 }}</a>
          </small>
        </header>
      </div>

      <div class="column is-6-widescreen is-12-desktop">
        <section class="section is-code-example"></section>
      </div>
    </div>

    <div class="columns is-gapless is-multiline content has-no-margin" v-for="section in content.sections">
      <div class="column is-6-widescreen is-12-desktop">
        <section
          :id="section.id"
          :class="{ section: true, 'is-code-description': ! section.main, 'is-code-title': section.main }"
        >
          <doc-header
            v-if="section.main"
            :key="section.id"
            :content="section"
            :children="getSectionChildren(section)"
          ></doc-header>

          <block
            :key="section.id"
            v-if="section.content && section.content.block"
            :content="section.content.block"
          />
        </section>
      </div>

      <div class="column is-6-widescreen is-12-desktop">
        <section class="section is-code-example">
          <snippet :key="section.id" v-if="section.code" :code="section.code"></snippet>
        </section>
      </div>
    </div>
  </div>
</template>

<script>
import config from 'config'
import Block from './Block'
import Snippet from './Snippet'
import DocHeader from './DocHeader'

export default {
  props: ['content'],

  components: { Block, DocHeader, Snippet },

  computed: {
    menu () {
      return this.content.sections.filter(s => s.main)
    },

    s3 () {
      return `${config.s3}/${this.$route.params.name}.json`
    }
  },

  methods: {
    scrollTo (id) {
      window.scrollTo(0, document.getElementById(id).offsetTop - 60)
    },

    getSectionChildren (section) {
      return this.content.sections.filter(s => s.parent === section.id)
    }
  }
}
</script>

<style lang="sass" scoped>
@import ../../assets/sass/variables

.section
  height: 100%

.section.is-code-example
  background: #263238
  overflow-x: auto
  border-bottom: 1px solid $primary

.section.is-code-description
  border-bottom: 1px solid $border-color

.section.is-code-title
  background: whitesmoke
  border-bottom: 1px solid $border-color

.has-no-margin
  margin: 0 !important

.tag.is-secondary
  background: $secondary
  color: white
</style>
