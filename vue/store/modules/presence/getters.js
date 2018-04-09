import _ from 'lodash'


export default {
  getUserPresence: (state, getters) => (uid) => {
    const presence = state.presence
    return presence[uid]
  },


  onlineUsers ({ presence }, getters, rootState, rootGetters) {
    const users = rootState.users.users
    const data = {}

    _.forEach(presence, (value, uid) => {
      console.log('presence: ', value)
      if (!value) return
      if (!users[uid] || !value.online) return
      data[uid] = { uid, ...users[uid] }
    })

    console.log('online users: ', data)

    return data
  }
}
