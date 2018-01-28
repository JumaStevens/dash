import Vue from 'vue'
import Vuex from 'vuex'
import error from './modules/error'
import user from './modules/user'
import chat from './modules/chat'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    error,
    user,
    chat
  },
  strict: process.env.NODE_ENV !== 'production'
})
