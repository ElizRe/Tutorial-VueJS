// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Vuetify from 'vuetify'
import App from './App'
import Ajouter from './components/Ajouter'



Vue.config.productionTip = false

const NotFound = { template: '<p>Page not found</p>' }
const Home = { template: '<p>home page</p>' }
const ajouter = { template: '<p>Page ajouter</p>' }

const routes = {
  '/': App,
  '/ajouter': Ajouter
}
/* eslint-disable no-new */
new Vue({
  el: '#app',
  components: { App },
  template: '<App/>',

  data: {
   currentRoute: window.location.pathname
 },
 computed: {
   ViewComponent () {
     return routes[this.currentRoute] || NotFound
   }
 },
 render (h) { return h(this.ViewComponent) }

})
