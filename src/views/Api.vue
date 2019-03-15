<template>
  <div>
    <v-navigation-drawer
      permanent
      fixed
      app
      floating
    >
      <v-toolbar flat>
        <v-toolbar-title class="subheading">
          <code class="elevation-0">{{ $route.params.branch }}</code>
          API Reference
        </v-toolbar-title>
      </v-toolbar>

      <v-form class="ma-2">
        <v-text-field
          hide-details
          label="Search"
          prepend-icon="search"
          v-model="pattern"
          single-line
        ></v-text-field>
      </v-form>

      <v-list
        subheader
        dense
        v-for="kit in Object.keys(docs)"
        :key="kit"
      >
        <v-subheader class="text-uppercase">@exteranto/{{ kit }}</v-subheader>

        <v-list-tile
          depressed
          block
          :style="{ fontFamily: 'monospace' }"
          v-for="type in filteredTypesFor(kit)"
          :key="type.id"
          :color="styles[type.kind].color"
          :to="{ name: 'api', params: { branch: $route.params.branch, package: kit, type: type.name } }"
        >
          <v-list-tile-content>
            {{ styles[type.kind].icon }} {{ type.name }}
          </v-list-tile-content>
        </v-list-tile>

        <v-divider></v-divider>
      </v-list>
    </v-navigation-drawer>

    <v-container grid-list-xl>
      <v-layout v-if="type">
        <v-flex xs12 md1>&nbsp;</v-flex>

        <v-flex xs12 md10>
          <component
            :is="components[type.kind]"
            :data="type"
          ></component>
        </v-flex>
      </v-layout>

      <v-layout v-else text-xs-center>
        <v-flex mt-5>
          <p class="display-2" style="color: #ccc; font-weight: 300">Select documentation from the menu</p>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
import colors from 'vuetify/es5/util/colors'

import Enum from '@/components/Enum'
import Class from '@/components/Class'
import Annotation from '@/components/Annotation'
import Interface from '@/components/Interface'

export default {
  data: () => ({
    pattern: '',
    colors,
    docs: {
      core: null,
      api: null,
      utils: null
    },
    components: {
      4: Enum,
      64: Annotation,
      128: Class,
      256: Interface
    },
    styles: {
      4: { color: 'purple', icon: 'E' },
      64: { color: 'cyan', icon: '@' },
      128: { color: 'primary', icon: 'C' },
      256: { color: 'green', icon: 'I' }
    }
  }),

  computed: {
    active () {
      return {
        package: this.$route.params.package,
        type: this.$route.params.type
      }
    },

    types () {
      return this.typesFor(this.active.package)
    },

    type () {
      return this.types.find(type => type.name === this.active.type)
    }
  },

  mounted () {
    Object.keys(this.docs).forEach(async (kit) => {
      this.docs[kit] = await import(`@/assets/docs/${this.$route.params.branch}/${kit}.json`)
        .then(docs => docs.default)
        .catch(() => this.$router.push({ name: 'api', params: { branch: 'develop' } }))
    })
  },

  methods: {
    typesFor (kit) {
      return (this.docs[kit] || { children: [] }).children
        .map(sub => sub.children || [])
        .reduce((carry, item) => carry.concat(item), [])
        .filter(type => type.flags.isExported && Object.keys(this.components).find(k => parseInt(k) === type.kind))
    },

    filteredTypesFor (kit) {
      return this.typesFor(kit)
        .filter(type => new RegExp(this.pattern.replace(/[^\w]/g, ''), 'i').test(kit + type.name + type.kindString.replace('Function', 'Annotation')))
    }
  }
}
</script>
