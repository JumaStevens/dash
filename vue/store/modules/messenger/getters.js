export default {
  getConversationMessages (state, getters, rootState, rootGetters) {
    const currentUser = rootGetters['auth/getCurrentUser']
    const activeConversation = state.activeConversation
    const messages = state.messages[activeConversation]
    const messagesArray = []

    for (var key in messages) {
      if (messages.hasOwnProperty(key)) {
        const message = {
          id: key,
          fromSelf: currentUser.uid === messages[key].uid,
          ...messages[key]
        }
        messagesArray.push(message)
      }
    }

    return messagesArray
  },


  getActiveConversationMembers (state, getters, rootState, rootGetters) {
    const currentUser = rootGetters['auth/getCurrentUser']
    const activeConversation = state.activeConversation
    const members = state.members[activeConversation]
    console.log('members: ', members)
  }
}

// init getting conversations from firebase by first retrieving all userConversations, than grabbing a the meta for each. Minimal info needed for initial render of UI. Only load full message when on 'opening' of a conversation
