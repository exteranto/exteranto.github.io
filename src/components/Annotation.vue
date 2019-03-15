<template>
  <v-card class="mb-3">
    <v-toolbar
      flat
      dark
      color="cyan"
    >
      <v-toolbar-title>
        Annotation&nbsp;<code style="box-shadow: none" v-html="`@${signatureString}`"></code>
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

    <v-sheet class="pa-4">
      <p class="body-2">{{ (signature.comment || {}).shortText || 'No description provided' }}</p>

      <v-list subheader v-if="signature.parameters">
        <v-divider></v-divider>

        <v-subheader class="text-uppercase">params</v-subheader>

        <v-list-tile v-for="param in signature.parameters" :key="param.id">
          <v-list-tile-action>
            <v-icon>keyboard_arrow_right</v-icon>
          </v-list-tile-action>

          <v-list-tile-content>
            <div>
              <span v-if="param.flags.isOptional">
                <kbd>optional</kbd>&nbsp;
              </span>
              <code v-html="`${param.name}: ${type(param.type)}`"></code>
              &nbsp;
              <em class="body-1">{{ ((param.comment || {}).shortText || '').trim() || 'No description provided' }}</em>
            </div>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
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
      return this.data.signatures[0] || {}
    },

    signatureString () {
      const params = (this.signature.parameters || [])
        .map(item => `${item.name}${(item.flags || {}).isOptional ? '?' : ''}: ${this.type(item.type)}`)
        .join(', ')

      return `${this.data.name} (${params})`
    }
  }
}
</script>
