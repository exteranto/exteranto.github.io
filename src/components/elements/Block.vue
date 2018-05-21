<template>
  <div class="block">
    <div class="block-head" v-html="title"></div>

    <div class="block-body">
      <slot />
    </div>
  </div>
</template>

<script>
export default {
  props: ['title']
}
</script>
