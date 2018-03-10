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
          fromSelf: uid === messages[key].uid,
          ...messages[key]
        }
        messagesArray.push(message)
      }
    }

    return messagesArray
  },


  getActiveConversationMembers (state, getters, rootState, rootGetters) {
    const getUser = rootGetters['users/getUser']
    const uid = currentUser(rootGetters).uid
    const id = rootState.route.params.id
    const members = id === 'new' || (rootState.messenger.app.activeList === 'users' && id !== 'new') ? state.app.newMembers : state.members[id]
    const membersArray = []

    for (var key in members) {
      if (members.hasOwnProperty(key) && key !== uid) {
        const member = {
          uid: key,
          ...getUser(key)
        }
        membersArray.push(member)
      }
    }

    return membersArray
  },


  getMembers: (state, getters, rootState, rootGetters) => (convoId) => {
    const getUser = rootGetters['users/getUser']
    const members = state.members[convoId] || {}
    const membersArray = []

    for (let key in members) {
      if (members.hasOwnProperty(key) && getUser(key)) membersArray.push({ uid: key, ...getUser(key) })
    }

    return membersArray
  },


  getMeta: (state, getters, rootState, rootGetters) => (type) => {
    const meta = state.meta
    const users = rootState.users.users
    const obj = type === 'pending' || type === 'conversations' ? state[type] : meta
    const data = []

    for (let key in obj) {
      if (obj.hasOwnProperty(key) && meta[key]) {
        data.push({ id: key, ...meta[key], ...users[meta[key].uid] })
      }
    }

    return data
  }
}
