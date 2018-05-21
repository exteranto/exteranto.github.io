<template>
  <main-layout>
    <main class="section">
      <div class="container">
        <div class="columns">
          <div class="column is-3">
            <aside>
              asd
            </aside>
          </div>
          <div class="column is-9 content">
            <slot />
          </div>
        </div>
      </div>
    </main>
  </main-layout>
</template>

<script>
import MainLayout from './Main'

export default {
  components: { MainLayout }
}
</script>
