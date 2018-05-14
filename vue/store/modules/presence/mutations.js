import Vue from 'vue'

export default {
  setPresence (state, payload) {
    Vue.set(state.presence, payload.key, payload.value)
    // console.log('setPresence ---> ', state)
  },


  deletePresence (state, payload) {
    Vue.delete(state.presence, payload.key)
    // console.log('deletePresence ---> ', state)
  }
}
