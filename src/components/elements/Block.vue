<template>
  <div class="block">
    <div class="block-head" v-html="content.title"></div>

    <div class="block-body">
      <div v-if="content.body.description">
        <p
          v-for="text in content.body.description"
          v-html="text"
          class="has-text-justified"
        ></p>
      </div>

      <div v-if="content.body.parameters">
        <hr>
        <strong>Parameters</strong>
        <ul>
          <li v-for="param in content.body.parameters">
            <span class="tag is-primary" v-if="param.optional">optional</span>
            <span class="tag is-secondary" v-else>required</span>
            <code>{{ param.type }}</code>
            {{ param.description }}
          </li>
        </ul>
      </div>

      <div v-if="content.body.returns">
        <hr>
        <strong>Returns</strong>
        <ul>
          <li>
            <code>{{ content.body.returns.type }}</code>
            {{ content.body.returns.description }}
          </li>
        </ul>
      </div>

      <div v-if="content.body.target">
        <hr>
        <strong>Target</strong>
        <ul>
          <li v-for="target in content.body.target">
            {{ target }}
          </li>
        </ul>
      </div>

      <div v-if="content.body.dispatches">
        <hr>
        <strong>Dispatches</strong>
        <ul>
          <li v-for="event in content.body.dispatches" v-html="event"></li>
        </ul>
      </div>

      <div v-if="content.body.values">
        <hr>
        <strong>Values</strong>
        <ul>
          <li v-for="value in content.body.values"><code>{{ value }}</code></li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['content']
}
</script>

<style lang="sass" scoped>
@import ../../assets/sass/variables

.tag.is-secondary
  background: $secondary
  color: white
</style>
