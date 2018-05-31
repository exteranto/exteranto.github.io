<template>
  <div class="container">
    <div class="columns is-multiline">
      <div class="column is-3-widescreen is-12-desktop">
        <concepts-side-menu />
      </div>

      <div class="column is-7-widescreen is-12-desktop content">
        <header class="section is-medium">
          <h1 class="title is-3">Events &amp; Listeners</h1>

          <ul>
            <li><a>Event Map</a></li>
            <li><a>Registering Listeners</a></li>
            <li><a>Registering Hooks</a></li>
          </ul>
        </header>

        <section class="section">
          <h2 class="title is-4">Event Map</h2>

          <p>All events that can be listened to by default with a description and the payload.</p>

          <table class="table is-striped">
            <thead>
              <tr>
                <th>Name</th>
                <th>Payload</th>
                <th>Fired after</th>
              </tr>
            </thead>

            <tbody>
              <tr>
                <td><code>app.booted</code></td>
                <td><code>null</code></td>
                <td>the application has been booted</td>
              </tr>
              <tr>
                <td><code>app.storage.local.changed</code></td>
                <td><code>{ key1: value1, key2: value2, ... }</code></td>
                <td>chaging a value in the local storage</td>
              </tr>
              <tr>
                <td><code>app.storage.sync.changed</code></td>
                <td><code>{ key1: value1, key2: value2, ... }</code></td>
                <td>chaging a value in the sync storage</td>
              </tr>
              <tr>
                <td><code>app.exception</code></td>
                <td><code>Error</code></td>
                <td>an exception occurred in the application</td>
              </tr>
              <tr>
                <td><code>app.exception.*</code></td>
                <td><code>Error</code></td>
                <td>a named exception was thrown</td>
              </tr>
            </tbody>
          </table>
        </section>

        <section class="section">
          <h2 class="title is-4">Registering Listeners</h2>

          <p>All listeners should be registered in the <em>event router</em>. This file is in each main script's folder root (background, content or popup). It is a simple javascript object where the key is the name of the event and the value is a listener or an array of listeners.</p>
        </section>
        <section class="section is-code-example"><snippet code="s3:Concepts.el.listeners"></snippet></section>

        <section class="section">
          <h2 class="title is-4">Registering Hooks</h2>

          <p>Hook is a simple funcion that is triggered upon firing the corresponding event. It is provided the same payload. Hooks were created mainly so that Vue components can easily communicate with other parts of the application. To register a hook, simply add the <code>@Listen</code> annotation to any method on any class and provide it the event name.</p>
          <blockquote>Note that the class has to be loaded in the runtime.</blockquote>
        </section>
        <section class="section is-code-example"><snippet code="s3:Concepts.el.hooks"></snippet></section>
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
