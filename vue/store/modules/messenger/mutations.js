import Vue from 'vue'


export default {
  addConversation (state, payload) {
    Vue.set(state.conversations, payload.key, payload.value)
    // console.log('addConversation -- state >> ', state)
    // console.log('addConversation -- payload >> ', payload)
  },

  
  deleteConversation (state, payload) {
    Vue.delete(state.conversations, payload.key)
    // console.log('deleteConversation -- state >> ', state)
    // console.log('deleteConversation -- payload >> ', payload)
  }
}
