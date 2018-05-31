<template>
  <div class="menu-container">
    <aside class="menu" v-for="menu in menus">
      <p class="menu-label">{{ menu.label }}</p>

      <ul class="menu-list">
        <li v-for="item in menu.items">
          <router-link
            :class="{ 'is-active': `${menu.slug}/${item}` === $route.params.name }"
            :key="item"
            :to="`/docs/${menu.slug}/${item}`"
          >
            @exteranto/<strong>{{ item }}</strong>
          </router-link>

          <side-sub-menu v-if="`${menu.slug}/${item}` === $route.params.name" :resource="`${menu.slug}/${item}`" />
        </li>
      </ul>
    </aside>
  </div>
</template>

<script>
import SideSubMenu from './SideSubMenu'

export default {
  components: { SideSubMenu },

  data () {
    return {
      menus: [
        {
          label: 'API Reference',
          slug: 'api',
          items: ['aop', 'cache', 'compatibility', 'core', 'events', 'exceptions', 'ioc', 'messaging', 'storage', 'support', 'tabs']
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
