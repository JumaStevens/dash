import Vue from 'vue'

export default {
  addFriend (state, payload) {
    Vue.set(state.friends, payload.key, payload.value)
    // console.log('add friends --> ', state.friends)
  },


  deleteFriend (state, payload) {
    Vue.delete(state.friends, payload.key)
    // console.log('delete friends --> ', state.friends)
  }
}
