<template>
  <div :class="['scroll-top', shownClass]" @click="scrollToTop">
    <span></span>
  </div>
</template>

<script>
export default {

  data () {
    return {
      shownClass: ''
    }
  },

  mounted () {
    this.listenForScroll()
  },

  methods: {
    scrollToTop () {
      window.scrollTo(0, 0)
    },

    listenForScroll () {
      window.addEventListener('scroll', (e) => {
        this.shownClass = window.scrollY > 400 ? 'is-shown' : ''
      })
    }
  }
}
</script>

<style lang="sass" scoped>
@import ../../assets/sass/variables

.scroll-top
  opacity: .0
  border: 1px solid $primary
  bottom: 2rem
  position: fixed
  right: 1rem
  display: flex
  align-items: center
  justify-content: center
  padding: 2rem
  border-radius: 50%
  transition: .2s ease opacity
  cursor: pointer

  &.is-shown
    opacity: .4

  &.is-shown:hover
    opacity: .7

  span:before, span:after
    content: ''
    position: absolute
    width: 25px
    border-top: 1px solid $primary
    transform: rotate(45deg)
    left: 29px

  span:after
    transform: rotate(-45deg)
    left: 12px
</style>
