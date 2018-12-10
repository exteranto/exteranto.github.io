<template>
  <div>
    <nav class="navigation">
      <router-link to="/">Exteranto</router-link>

      <div class="navigation-spacer"></div>

      <div class="navigation-dropdown">
        <router-link to="/docs/api/aop">API Reference</router-link>

        <ul>
          <li><router-link to="/docs/api/aop">@exteranto/<strong>aop</strong></router-link></li>
          <li><router-link to="/docs/api/cache" replace>@exteranto/<strong>cache</strong></router-link></li>
          <li><router-link to="/docs/api/compatibility">@exteranto/<strong>compatibility</strong></router-link></li>
          <li><router-link to="/docs/api/core">@exteranto/<strong>core</strong></router-link></li>
          <li><router-link to="/docs/api/events">@exteranto/<strong>events</strong></router-link></li>
          <li><router-link to="/docs/api/exceptions">@exteranto/<strong>exceptions</strong></router-link></li>
          <li><router-link to="/docs/api/ioc">@exteranto/<strong>ioc</strong></router-link></li>
          <li><router-link to="/docs/api/messaging">@exteranto/<strong>messaging</strong></router-link></li>
          <li><router-link to="/docs/api/storage">@exteranto/<strong>storage</strong></router-link></li>
          <li><router-link to="/docs/api/support">@exteranto/<strong>support</strong></router-link></li>
          <li><router-link to="/docs/api/tabs">@exteranto/<strong>tabs</strong></router-link></li>
          <li><router-link to="/docs/api/permissions">@exteranto/<strong>permissions</strong></router-link></li>
        </ul>
      </div>

      <div class="navigation-separator"></div>
      <div class="navigation-dropdown">
        <router-link to="/concepts/configuration">Basic Concepts</router-link>

        <ul>
          <li><router-link to="/concepts/configuration">Configuration</router-link></li>
          <li><router-link to="/concepts/events-listeners">Events &amp; Listeners</router-link></li>
          <li><router-link to="/concepts/service-providers">Service Providers</router-link></li>
          <li><router-link to="/concepts/aspects">Aspects</router-link></li>
          <li><router-link to="/concepts/packing-manifests">Packing &amp; Manifests</router-link></li>
        </ul>
      </div>
    </nav>

    <transition name="fade">
      <router-view />
    </transition>

    <div class="container">
      <footer class="footer">
        <p class="has-text-centered">
          <a target="_blank" href="https://github.com/exteranto/exteranto">Exteranto</a>
          browser extension framework, mainained by
          <a target="_blank" href="https://pavelkoch.io">Pavel Koch</a>
        </p>
      </footer>
    </div>

    <scroll-top></scroll-top>
  </div>
</template>

<script>
import ScrollTop from '@/components/elements/ScrollTop'

export default {
  components: { ScrollTop }
}
</script>

<style lang="sass">
@import assets/sass/app
</style>
