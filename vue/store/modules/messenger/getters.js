const currentUser = (rootGetters) => rootGetters['auth/getCurrentUser']

export default {
  getConversationMessages (state, getters, rootState, rootGetters) {
    const uid = currentUser(rootGetters).uid
    const activeConversation = state.activeConversation
    const messages = state.messages[activeConversation]
    const messagesArray = []

    for (var key in messages) {
      if (messages.hasOwnProperty(key)) {
        const message = {
          id: key,
          fromSelf: uid === messages[key].uid,
          ...messages[key]
        }
        messagesArray.push(message)
      }
    }

    return messagesArray
  },


  getActiveConversationMembers (state, getters, rootState, rootGetters) {
    const activeConversation = state.activeConversation
    console.log('getActive: ', state.members[activeConversation])
    return state.members[activeConversation]
  }
}
