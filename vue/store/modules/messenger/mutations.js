import Vue from 'vue'


export default {
  setConversation (state, payload) {
    Vue.set(state.conversations, payload.key, payload.value)
    // console.log('addConversation -- state >> ', state)
    // console.log('addConversation -- payload >> ', payload)
  },


  deleteConversation (state, payload) {
    Vue.delete(state.conversations, payload.key)
    // console.log('deleteConversation -- state >> ', state)
    // console.log('deleteConversation -- payload >> ', payload)
  },


  setConversationMeta (state, payload) {
    Vue.set(state.meta, payload.key, payload.value)
    // console.log('addConversationMeta -- state >> ', state)
    // console.log('addConversationMeta -- payload >> ', payload)
  },


  deleteConversationMeta (state, payload) {
    Vue.delete(state.meta, payload.key)
    // console.log('deleteConversationMeta -- state >> ', state)
    // console.log('deleteConversationMeta -- payload >> ', payload)
  },


  setConversationId (state, payload) {
    state.conversationId = payload
    // console.log('setConversationId -- state >> ', state)
    // console.log('setConversationId -- payload >> ', payload)
  },


  clearConversationId (state) {
    state.conversationId = ''
    // console.log('clearConversationId -- state >> ', state)
  },


  setMessages (state, payload) {
    Vue.set(state.messages, payload.key, payload.value)
    // console.log('setMessages -- state >> ', state)
    // console.log('setMessages -- payload >> ', payload)
  },


  setMembers (state, payload) {
    Vue.set(state.members, payload.key, payload.value)
    // console.log('setMembers -- state >> ', state)
    // console.log('setMembers -- payload >> ', payload)
  },


  setNewMember (state, payload) {
    Vue.set(state.app.newMembers, payload.key, payload.value)
  },


  deleteNewMember (state, payload) {
    Vue.delete(state.app.newMembers, payload.key, payload.value)
  },


  clearNewMembers (state) {
    state.app.newMembers = {}
  },


  setActiveList (state, payload) {
    state.app.activeList = payload.value
  }


}
