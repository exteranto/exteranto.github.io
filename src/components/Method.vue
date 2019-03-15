<template>
  <v-card class="mb-3">
    <v-toolbar
      flat
      dense
      :dark="isDeprecated"
      :color="isDeprecated ? 'red' : ''"
    >
      <v-toolbar-title class="subheading">
        <span v-if="data.flags.isStatic">
          <kbd>static</kbd>&nbsp;
        </span>
        <span v-if="isDeprecated">
          <kbd>deprecated</kbd>&nbsp;
        </span>
        <code class="elevation-0" v-html="signatureString"></code>
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
      <p class="body-2">{{ ((signature.comment || {}).shortText || '').trim() || 'No description provided' }}</p>

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
              <em class="body-1">{{ ((param.comment || {}).text || '').trim() || 'No description provided' }}</em>
            </div>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>

      <v-list subheader>
        <v-divider></v-divider>

        <v-subheader class="text-uppercase">returns</v-subheader>

        <v-list-tile>
          <v-list-tile-content>
            <p>
              <code v-html="type(signature.type)"></code>
              &nbsp;
              <em class="body-1">{{ ((signature.comment || {}).returns || '').trim() }}</em>
            </p>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>

      <v-list subheader v-if="throws.length">
        <v-divider></v-divider>

        <v-subheader class="text-uppercase">throws</v-subheader>

        <v-list-tile v-for="exception in throws" :key="exception">
          <v-list-tile-action>
            <v-icon>keyboard_arrow_right</v-icon>
          </v-list-tile-action>

          <v-list-tile-content>
            <div v-html="exception"></div>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-sheet>
  </v-card>
</template>

<script>
import { Member } from '@/core/Member'

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

    isDeprecated () {
      return ((this.signature.comment || {}).tags || [])
        .filter(t => t.tag === 'deprecated').length > 0
    },

    signatureString () {
      let signature = this.data.name

      if (this.signature.typeParameter) {
        signature += '&lt;' + (this.signature.typeParameter || [])
          .map(item => item.name)
          .join(', ') + '&gt;'
      }

      const params = (this.signature.parameters || [])
        .map(item => `${item.name}${(item.flags || {}).isOptional ? '?' : ''}: ${this.type(item.type)}`)
        .join(', ')

      return `${signature} (${params}) : ${this.type(this.signature.type)}`
    },

    throws () {
      return ((this.signature.comment || {}).tags || [])
        .filter(tag => tag.tag === 'throws')
        .map((tag) => {
          const text = tag.text.replace(/\n/g, '')

          return `<code>${text.replace(/\{([^}]+)\}.*/g, '$1')}</code> &nbsp; <em class="body-1">${text.replace(/\{([^}]+)\} /, '')}</em>`
        })
    }
  },

  mounted () {
    console.log(new Member(this.data).toString())
  }
}
</script>
