import './directives'
import Vue from 'vue'
import App from './App'
import axios from 'axios'
import store from './store'
import routes from './routes'
import Router from 'vue-router'
import VueAxios from 'vue-axios'

Vue.use(Router)
Vue.use(VueAxios, axios)

const router = new Router({ routes })

router.beforeEach((to, from, next) => {
  window.scrollTo(0, 0)
  next()
})

export default new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
