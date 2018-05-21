import './directives'
import Vue from 'vue'
import App from './App'
import routes from './routes'
import Router from 'vue-router'

Vue.use(Router)

export default new Vue({
  router: new Router({ routes }),
  render: h => h(App)
}).$mount('#app')
