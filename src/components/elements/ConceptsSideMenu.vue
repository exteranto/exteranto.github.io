<template>
  <div class="menu-container">
    <aside class="menu" v-for="menu in menus">
      <p class="menu-label">{{ menu.label }}</p>

      <ul class="menu-list">
        <li v-for="item in menu.items">
          <router-link
            :class="{ 'is-active': `/concepts/${item.slug}` === $route.path }"
            :key="item.slug"
            :to="`/concepts/${item.slug}`"
          >
            {{ item.name }}
          </router-link>
        </li>
      </ul>
    </aside>
  </div>
</template>

<script>
export default {
  data () {
    return {
      menus: [
        {
          label: 'Basic Concepts',
          items: [
            { slug: 'configuration', name: 'Configuration' },
            { slug: 'events-listeners', name: 'Events & Listeners' },
            { slug: 'service-providers', name: 'Service Providers' },
            { slug: 'aspects', name: 'Aspects' },
            { slug: 'packing-manifests', name: 'Packing & Manifests' }
          ]
        }
      ]
    }
  }
}
</script>

<style lang="sass" scoped>
.menu-container
  padding: 2rem 1rem

  @media screen and (min-width: 1152px)
    position: fixed
</style>
