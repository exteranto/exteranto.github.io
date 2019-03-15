<template>
  <v-card class="mb-3">
    <v-toolbar flat dense>
      <v-toolbar-title class="subheading">
        <code class="elevation-0">{{ data.name }}</code>
      </v-toolbar-title>
    </v-toolbar>

    <div v-if="githubUrl">
      <v-sheet class="pa-3">
        <em class="body-1">
          Defined in
          <a
            :href="githubUrl"
            target="_blank"
          >{{ sourceFileName }}</a>
        </em>
      </v-sheet>

      <v-divider></v-divider>
    </div>
  </v-card>
</template>

<script>
import HandlesSource from '@/mixins/HandlesSource'

export default {
  props: {
    data: Object
  },

  mixins: [HandlesSource]
}
</script>
