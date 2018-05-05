import _ from 'lodash'

const currentUser = (rootGetters) => rootGetters['auth/getCurrentUser']

export default {
  getConversationMessages (state, getters, rootState, rootGetters) {
    const uid = currentUser(rootGetters).uid
    const convoId = rootState.route.params.id
    const messages = state.messages[convoId]
    const getUser = rootGetters['users/getUser']
    const messagesArray = []

    // build message with user data
    _.forEach(messages, (value, key) => {
      const message = messages[key]

      messagesArray.push({
        id: key,
        fromSelf: uid === message.uid,
        ...message,
        user: {
          ...getUser(message.uid)
        }
      })
    })

    console.log('activeConvo: --> ', messagesArray)

    return messagesArray
  },


  getActiveConversationMembers (state, getters, rootState, rootGetters) {
    const getUser = rootGetters['users/getUser']
    const uid = currentUser(rootGetters).uid
    const id = rootState.route.params.id
    const members = id === 'new' || (rootState.messenger.app.activeList === 'users' && id !== 'new') ? state.app.newMembers : state.members[id]
    const membersArray = []

    for (var key in members) {
      if (members.hasOwnProperty(key)) {
        const member = {
          uid: key,
          ...getUser(key)
        }
        membersArray.push(member)
      }
    }

    return membersArray
  },


  members ({ members }, getters, rootState) {
    const users = rootState.users.users
    const data = {}

    _.forEach(members, (value, id) => {
      const membersUid = Object.keys(value)

      membersUid.forEach(uid => {
        if (!users[uid]) return
        if (!data[id]) data[id] = []
        data[id].push({ id, uid, ...users[uid] })
      })
    })

    console.log('members data: ', data)
    return data
  },


  getMeta ({ meta }, { members }, rootState, rootGetters) { // TO DO: account for when "bot" writes x removed x message (bot is not apart of members)
    const authUid = currentUser(rootGetters).uid
    const data = {}

    _.forEach(meta, (value, id) => {
      if (!members[id]) return

      const user = members[id].find(member => member.uid === value.uid)
      if (!user) return

      // if (members[id].length === 1 && value.uid === authUid) {
      //   data[id] = { id, ...value, ...user }
      // }

      if (members[id].length === 1) data[id] = { id, ...value, ...user }


      else if (value.uid === authUid) {
        const otherUser = members[id].find(member => member.uid !== authUid)
        console.log('otherUser: ', otherUser)
        data[id] = { id, ...value, message: `You: ${value.message}`, ...otherUser }
      }

      // if (members[id].length === 2) {
      //   const otherUser = members[id].find(member => member.uid !== authUid)
      //   console.log('otherUser: ', otherUser)
      //   data[id] = { id, ...value, message: `${user.displayName}: ${value.message}`, ...otherUser }
      // }
      else {
        data[id] = { id, ...value, ...user }
      }

      if (members[id].length > 1) data[id] = { ...data[id], displayName: `${data[id].displayName} +${members[id].length - 2}` }

    })

    console.log('meta data: ', data)
    return data
  },


  //
  getPendingMeta ({ pending, members, meta }, getters, { users }, rootGetters) {
    // const pending = state.pending
    console.log('-->>><<<>>>> ', users)
    const pendingArray = []

    // _.forEach(pending, (value, key) => {
    //
    //   const data = {
    //     ...members[key],
    //     ...meta[key],
    //     users: users.users[meta],
    //
    //     message: '',
    //     users: []
    //   }
    //
    // })
  }
}
