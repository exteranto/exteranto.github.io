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

      <hr>
    </aside>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import SideSubMenu from './SideSubMenu'

export default {
  components: { SideSubMenu },

  data () {
    return {
      menus: [
        {
          label: 'API Reference',
          slug: 'api',
          items: ['aop', 'cache', 'compatibility', 'core']
        },
        {
          label: 'Basic Concepts',
          slug: 'concepts',
          items: []
        }
      ]
    }
  },

  computed: mapGetters(['docs'])
}
</script>

<style lang="sass" scoped>
.menu-container
  padding: 2rem 1rem
  position: fixed
</style>
