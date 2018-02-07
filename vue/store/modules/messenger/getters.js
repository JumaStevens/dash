const currentUser = (rootGetters) => rootGetters['auth/getCurrentUser']

export default {
  getConversationMessages (state, getters, rootState, rootGetters) {
    const uid = currentUser(rootGetters).uid
    const messages = state.messages[rootState.route.params.id]
    const messagesArray = []

    for (var key in messages) {
      if (messages.hasOwnProperty(key)) {
        const message = {
          id: key,
          fromSelf: uid == messages[key].uid,
          ...messages[key]
        }
        console.log('get ---> ', messages[key])
        messagesArray.push(message)
      }
    }

    console.log('--->< ', rootState.route.params.id)
    return messagesArray
  },


  getActiveConversationMembers (state, getters, rootState, rootGetters) {
    const conversationId = state.conversationId
    console.log('getActive: ', state.members[conversationId])
    return state.members[conversationId]
  },


  getConversationMeta (state, getters, rootState, rootGetters) {
    const users = rootState.users.users
    const meta = state.meta
    const metaArray = []

    for (var key in meta) {
      if (meta.hasOwnProperty(key)) metaArray.push({ id: key, ...meta[key] })
    }

    return metaArray
  }
}
