
import Vue from 'vue'

/**
 * The image lazy-loading directive.
 */
Vue.directive('lazy-load', (el, { value }) => {
  const img = document.createElement('img')
  img.src = value
  img.onload = () => {
    el.src = value
  }
})
