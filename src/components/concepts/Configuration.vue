<template>
  <div class="container">
    <div class="columns is-multiline">
      <div class="column is-3-widescreen is-12-desktop">
        <concepts-side-menu />
      </div>

      <div class="column is-7-widescreen is-12-desktop content">
        <header class="section is-medium">
          <h1 class="title is-3">Configuration</h1>

          <ul>
            <li><a>Registering Providers</a></li>
            <li><a>Registering Aspects</a></li>
            <li><a>Bound Parameters</a></li>
          </ul>
        </header>

        <section class="section">
          <h2 class="title is-4">Registering Providers</h2>

          <p>To register a service provider, simply add a constructor reference to that provider to the <code>providers</code> array in the main configuration file. Read more about providers in the 'Basic Concepts > Service Providers' section.</p>
        </section>
        <section class="section is-code-example"><snippet code="s3:Concepts.config.providers"></snippet></section>

        <section class="section">
          <h2 class="title is-4">Registering Aspects</h2>

          <p>Aspects are registered in the same way as providers. Just add a constructor reference to the <code>aspects</code> array in the main configuration file. Read more about aspects in the 'Basic Concepts > Aspects' section</p>
        </section>
        <section class="section is-code-example"><snippet code="s3:Concepts.config.aspects"></snippet></section>

        <section class="section">
          <h2 class="title is-4">Bound Parameters</h2>

          <p>You can also automatically bind parameters to the application container from the configuration file. Use the <code>bound</code> object in the file and you will be able to access your parameters via the <code>@Param</code> annotation.</p>
        </section>
        <section class="section is-code-example"><snippet code="s3:Concepts.config.params"></snippet></section>
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
