import Vue from 'vue'


export default {
  SET_CONVERSATION (state, payload) {
    Vue.set(state.conversations, payload.key, payload.value)
    // console.log('addConversation -- state >> ', state)
    // console.log('addConversation -- payload >> ', payload)
  },


  DELETE_CONVERSATION (state, payload) {
    Vue.delete(state.conversations, payload.key)
    // console.log('deleteConversation -- state >> ', state)
    // console.log('deleteConversation -- payload >> ', payload)
  },


  SET_META (state, payload) {
    Vue.set(state.meta, payload.key, payload.value)
    // console.log('addConversationMeta -- state >> ', state)
    // console.log('addConversationMeta -- payload >> ', payload)
  },


  DELETE_META (state, payload) {
    Vue.delete(state.meta, payload.key)
    // console.log('deleteConversationMeta -- state >> ', state)
    // console.log('deleteConversationMeta -- payload >> ', payload)
  },


  SET_MESSAGES (state, payload) {
    const messages = state.messages[payload.convoId] ? state.messages[payload.convoId] : {}
    const value = { ...messages, [payload.key]: payload.value }
    Vue.set(state.messages, payload.convoId, value)
    // console.log('setMessages -- state >> ', state)
    // console.log('setMessages -- payload >> ', payload)
  },


  DELETE_MESSAGES (state, payload) {
    Vue.delete(state.messages[payload.convoId], payload.key)
    // console.log('deleteMessages -- state >> ', state)
    // console.log('deleteMessages -- payload >> ', payload)
  },


  SET_MEMBERS (state, payload) {
    const members = Object.assign({}, state.members[payload.convoId])
    const value = { ...members, [payload.key]: payload.value }
    Vue.set(state.members, payload.convoId, value)
    // console.log('setMembers -- state >> ', state)
    // console.log('setMembers -- payload >> ', payload)
  },


  DELETE_MEMBERS (state, payload) {
    Vue.delete(state.members[payload.convoId], payload.key)
    console.log('deleteMembers -- state >> ', state)
    console.log('deleteMembers -- payload >> ', payload)
  },


  SET_PENDING (state, payload) {
    Vue.set(state.pending, payload.key, payload.value)
    // console.log('setPending -- state >> ', state)
    // console.log('setPending -- payload >> ', payload)
  },


  DELETE_PENDING (state, payload) {
    Vue.delete(state.pending, payload.key)
    console.log('deletePending -- state >> ', state)
    console.log('deletePending -- payload >> ', payload)
  },


  setNewMember (state, payload) {
    Vue.set(state.app.newMembers, payload.key, payload.value)
    console.log('setNewMember -- state >> ', state)
    console.log('setNewMember -- payload >> ', payload)
  },


  deleteNewMember (state, payload) {
    Vue.delete(state.app.newMembers, payload.key)
    console.log('deleteNewMember -- state >> ', state)
    console.log('deleteNewMember -- payload >> ', payload)
  },


  clearNewMembers (state) {
    state.app.newMembers = {}
  },


  SET_ACTIVE_LIST (state, payload) {
    state.app.activeList = payload.value
  },


  UPDATE_APP_SEARCH (state, payload) {
    state.app.search = payload.value
    console.log('search state: ', state.app.search)
  }


}
