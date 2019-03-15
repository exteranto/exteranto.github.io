<template>
  <v-card class="mb-3">
    <v-toolbar
      flat
      dense
    >
      <v-toolbar-title class="subheading">
        <code style="box-shadow: none" v-html="signatureString"></code>
      </v-toolbar-title>

      <v-spacer></v-spacer>

      <v-btn icon>
        <v-icon>code</v-icon>
      </v-btn>
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

    <v-sheet class="pl-4 pr-4 pt-4 pb-2">
      <p class="body-2">{{ ((data.comment || {}).shortText || '').trim() || 'No description provided' }}</p>
    </v-sheet>
  </v-card>
</template>

<script>
import HandlesSource from '@/mixins/HandlesSource'
import ComputesSignature from '@/mixins/ComputesSignature'

export default {
  props: {
    data: Object
  },

  mixins: [ComputesSignature, HandlesSource],

  computed: {
    signature () {
      return (this.data.getSignature || [])[0] || {}
    },

    signatureString () {
      return `get ${this.data.name}: ${this.type(this.signature.type)}`
    }
  },

  mounted () {
    console.log(this.data)
  }
}
</script>
