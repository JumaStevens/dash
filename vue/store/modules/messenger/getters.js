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


  getMembers: (state, getters, rootState) => (convoId) => {
    const users = rootState.users.users
    const members = state.members[convoId] || {}
    const membersArray = []

    for (let key in members) {
      if (members.hasOwnProperty(key) && users[key]) membersArray.push({ uid: key, ...users[key] })
    }

    return membersArray
  },


  getMeta: (state, getters, rootState, rootGetters) => (type) => {
    const authUid = currentUser(rootGetters).uid
    const meta = state.meta
    const users = rootState.users.users
    const obj = state.conversations
    const data = []

    console.log('sljflsf?: ', obj)
    _.forEach(obj, (value, key) => {
      const members = state.members[key]

      if (!members) return
      const metaUid = meta[key].uid
      const MetaUsers = []

      const membersUid = Object.keys(members)

      console.log('??: ', members.length)

      // if auth user is only member
      if (membersUid.length === 1 && metaUid === authUid) {
        console.log('solo life!')
      }

      if (membersUid.length === 2) {
        console.log('twos company.')
      }

      if (membersUid.length >= 3) {
        console.log('party in the usa!')
      }




      // if group message, find meta user
      // const otherUserUid = Object.keys(state.members[key]).find( uid => uid !== authUid )
      // if (otherUserUid)
      // console.log('other: ', otherUserUid)
      // { ...users[metaUid],}
      // if (state.members[key].length > 2) {
      //   const users = Object.keys(state.members[key]).reduce( (accumulator, elem, index, array) => {
      //     if ()
      //   }, {})
      // }
      //
      // console.log('members: ', members)
      // const users = members.filter(member => console.log('->m ', member))


    })


    for (let key in obj) {
      if (obj.hasOwnProperty(key) && meta[key]) {
        data.push({ id: key, ...meta[key], ...users[meta[key].uid] })
      }
    }




    // for (let key in obj) {
    //   if (obj.hasOwnProperty(key) && meta[key]) {
    //     data.push({ id: key, ...meta[key], ...users[meta[key].uid] })
    //   }
    // }

    // getters.getPendingMeta

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
