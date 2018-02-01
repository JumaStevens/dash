import Vue from 'vue'
import Vuex from 'vuex'
import error from './modules/error'
import auth from './modules/auth'
import messenger from './modules/messenger'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    error,
    auth,
    messenger
  },
  strict: process.env.NODE_ENV !== 'production'
})
