<template>
  <v-app>
    <v-toolbar app dark color="primary">
      <v-toolbar-title class="headline">
        <v-btn flat :to="{ name: 'home' }">Exteranto</v-btn>
      </v-toolbar-title>

      <v-spacer></v-spacer>

      <v-menu
        bottom
        transition="slide-y-transition"
      >
        <v-btn
          slot="activator"
          flat
        >
          <span class="mr-2">API Reference</span>
        </v-btn>

        <v-list>
          <v-list-tile>
            <v-btn :to="{ name: 'api', params: { branch: 'master' } }" flat>master</v-btn>
          </v-list-tile>
          <v-list-tile>
            <v-btn :to="{ name: 'api', params: { branch: '3.0' } }" flat>3.0</v-btn>
          </v-list-tile>
          <v-list-tile>
            <v-btn :to="{ name: 'api', params: { branch: '2.5' } }" flat>2.5</v-btn>
          </v-list-tile>
          <v-list-tile>
            <v-btn :to="{ name: 'api', params: { branch: '2.3' } }" flat>2.3</v-btn>
          </v-list-tile>
        </v-list>
      </v-menu>
    </v-toolbar>

    <v-content>
      <router-view></router-view>
    </v-content>
  </v-app>
</template>

<script>
export default {
  //
}
</script>

<style>
aside::-webkit-scrollbar {
  width: 0.5em;
}
aside::-webkit-scrollbar-track {
  border-left: 1px solid #f1f1f1;
  border-right: 1px solid #f1f1f1;
  background: #fafafa;
  box-shadow: none;
  outline: none;
}
aside::-webkit-scrollbar-thumb {
  background-color: #1976d2;
}
</style>
