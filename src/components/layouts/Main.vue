<template>
  <div>
    <nav class="navigation">
      <router-link to="/">Exteranto</router-link>

      <div class="navigation-spacer"></div>

      <div class="navigation-dropdown">
        <router-link to="/">API Reference</router-link>

        <ul>
          <li><router-link to="/api/aop">@exteranto/<strong>aop</strong></router-link></li>
          <li><router-link to="/api/cache">@exteranto/<strong>cache</strong></router-link></li>
          <li><router-link to="/">@exteranto/<strong>compatibility</strong></router-link></li>
          <li><router-link to="/">@exteranto/<strong>core</strong></router-link></li>
          <li><router-link to="/">@exteranto/<strong>events</strong></router-link></li>
          <li><router-link to="/">@exteranto/<strong>exceptions</strong></router-link></li>
          <li><router-link to="/">@exteranto/<strong>ioc</strong></router-link></li>
          <li><router-link to="/">@exteranto/<strong>messaging</strong></router-link></li>
          <li><router-link to="/">@exteranto/<strong>storage</strong></router-link></li>
          <li><router-link to="/">@exteranto/<strong>support</strong></router-link></li>
          <li><router-link to="/">@exteranto/<strong>tabs</strong></router-link></li>
        </ul>
      </div>

      <div class="navigation-separator"></div>
      <div class="navigation-dropdown">
        <router-link to="/">Basic Concepts</router-link>

        <ul>
          <li><router-link to="/">Configuration</router-link></li>
          <li><router-link to="/">Events &amp; Listeners</router-link></li>
          <li><router-link to="/">IOC Container</router-link></li>
          <li><router-link to="/">Service Providers</router-link></li>
          <li><router-link to="/">Aspects</router-link></li>
          <li><router-link to="/">Packing &amp; Manifests</router-link></li>
        </ul>
      </div>
    </nav>

    <slot />

    <div class="container">
      <footer class="footer">
        <p class="has-text-centered">
          <a target="_blank" href="https://github.com/exteranto/exteranto">Exteranto</a>
          browser extension framework, mainained by
          <a target="_blank" href="https://pavelkoch.io">Pavel Koch</a>
        </p>
      </footer>
    </div>
  </div>
</template>

<script>
export default {
  //
}
</script>
