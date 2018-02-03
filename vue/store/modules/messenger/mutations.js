export default {
  setConversations (state, payload) {
    state.conversations = payload
    console.log('conversations: ', state.conversations)
  },
  addConversation (state, payload) {
    console.log('before state: ', state.conversations)
    //state.conversations[payload.key] = payload.value
    console.log('payload: ', payload)
    console.log('state: ', state.conversations)
  },
  deleteConversation (state, payload) {

  }
}
