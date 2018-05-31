<template>
  <div class="container">
    <div class="columns is-multiline">
      <div class="column is-3-widescreen is-12-desktop">
        <concepts-side-menu />
      </div>

      <div class="column is-7-widescreen is-12-desktop content">
        <header class="section is-medium">
          <h1 class="title is-3">Packing &amp; Manifests</h1>

          <ul>
            <li><a>...</a></li>
          </ul>
        </header>

        <section class="section">
          <h2 class="title is-4">...</h2>

          <p>...</p>
        </section>
        <section class="section is-code-example"><snippet code="..."></snippet></section>
      </div>
    </div>
  </div>
</template>

<script>
import Snippet from '@/components/elements/Snippet'
import ConceptsSideMenu from '@/components/elements/ConceptsSideMenu'

export default {
  components: { ConceptsSideMenu, Snippet }
}
</script>

<style lang="sass" scoped>
.section.is-code-example
  background: #263238
</style>
