<template>
  <v-card class="mb-5">
    <v-toolbar flat dark color="purple">
      <v-toolbar-title>
        Enum&nbsp;<code v-html="type.toString()"></code>
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
      v-if="members.length"
    >
      <p class="body-2" v-if="data.comment">{{ ((data.comment || {}).shortText || '').trim() }}</p>

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
import EnumMember from '@/components/EnumMember'

export default {
  props: {
    data: Object
  },

  data: () => ({
    components: {
      16: EnumMember
    }
  }),

  computed: {
    type () {
      return new Type(this.data, this.$route.params)
    },

    members () {
      return this.type.enumMembers()
    }
  }
}
</script>
