import Vue from 'vue'
import Vuex from 'vuex'
import error from './modules/error'
import auth from './modules/auth'
import messenger from './modules/messenger'
import users from './modules/users'
import friends from './modules/friends'
import media from './modules/media'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    error,
    auth,
    messenger,
    users,
    friends,
    media
  },
  strict: process.env.NODE_ENV !== 'production'
})
