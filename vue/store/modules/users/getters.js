const currentUser = (rootGetters) => rootGetters['auth/getCurrentUser']

export default {
  getUsers (state, getters, rootState, rootGetters) {
    const uid = currentUser(rootGetters).uid
    const users = state.users
    const usersArray = []

    for (var key in users) {
      if (users.hasOwnProperty(key) /*&& uid !== key*/) {
        const user = {
          uid: key,
          ...users[key]
        }
        usersArray.push(user)
      }
    }
    return usersArray
  },

  getUser: (state) => (uid) => {
    const users = state.users
    const user = users[uid]
    if (user) return user
    else console.log('user is false!')
  }


}
