<template>
  <div class="container">
    <div class="columns is-multiline">
      <div class="column is-3-widescreen is-12-desktop">
        <concepts-side-menu />
      </div>

      <div class="column is-7-widescreen is-12-desktop content">
        <header class="section is-medium">
          <h1 class="title is-3">Service Providers</h1>

          <ul>
            <li><a>Concept</a></li>
            <li><a>Creating Provider</a></li>
          </ul>
        </header>

        <section class="section">
          <h2 class="title is-4">Concept</h2>

          <p>Service providers were introduced in order to allow more complex ioc container binding. For example if you need to register a different implementation of a service per-browser or bind a service to its abstract class, service providers are the way to go.</p>
        </section>

        <section class="section">
          <h2 class="title is-4">Creating Provider</h2>

          <p>To create a provider, simply create a class that extends the abstract <code>Provider</code> and implement the <code>register</code> and <code>only</code> methods.</p>
          <p>A container instance is passed to the <code>register</code> method and this is also the place where you perform the binding.</p>
          <p>The <code>only</code> method can be optionally overridden to restrict registering of the provider only for certain script types.</p>
          <blockquote>Note that provider the needs to be registered in the main configuration file.</blockquote>
        </section>
        <section class="section is-code-example"><snippet code="s3:Concepts.sp.provider"></snippet></section>
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
