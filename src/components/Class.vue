<template>
  <v-card class="mb-5">
    <v-toolbar flat dark color="primary">
      <v-toolbar-title>
        Class&nbsp;<code v-html="type.toString()"></code>
      </v-toolbar-title>
    </v-toolbar>

    <div v-if="type.githubUrl()">
      <v-sheet class="pa-3">
        <em class="body-1">
          Defined in
          <a
            :href="type.githubUrl()"
            target="_blank"
          >{{ type.sourceFileName() }}</a>
        </em>
      </v-sheet>

      <v-divider></v-divider>
    </div>

    <v-sheet
      class="pa-3"
      v-if="members.length || type.comment()"
    >
      <p class="body-2">{{ (type.comment().shortText || '').trim() }}</p>

      <component
        v-for="member in members"
        :key="member.id"
        :is="components[member.kind]"
        :data="member"
      ></component>
    </v-sheet>
  </v-card>
</template>

<script>
import { Type } from '@/core/Type'
import Method from '@/components/Method'
import Accessor from '@/components/Accessor'
import Property from '@/components/Property'
import Constructor from '@/components/Constructor'

export default {
  props: {
    data: Object
  },

  data: () => ({
    components: {
      512: Constructor,
      1024: Property,
      2048: Method,
      262144: Accessor
    }
  }),

  computed: {
    type () {
      return new Type(this.data, this.$route.params)
    },

    members () {
      return [
        ...this.type.accessors(),
        ...this.type.properties(),
        ...this.type.constructors(),
        ...this.type.methods()
      ]
    }
  }
}
</script>
