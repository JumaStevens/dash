import Vue from 'vue'
import App from './App.vue'
import store from './store/store'
import router from './router'
import './util/vue-lazyload'

window.onload = () => {
  new Vue({
    el: '#vue-app',
    store,
    router,
    render: h => h(App)
  })
}
