import Vue from 'vue'

export default {
  addUser (state, payload) {
    Vue.set(state.users, payload.key, payload.value)
    console.log('add user --> ', state.users)
    console.log('add user payload --> ', payload)
  },

  SET_USER (state, payload) {
    Vue.set(state.users, payload.key, payload.value)
    console.log('add user --> ', state.users)
    console.log('add user payload --> ', payload)
  },


  deleteUser (state, payload) {
    Vue.delete(state.users, payload.key)
    // console.log('delete user --> ', state.users)
  }
}
