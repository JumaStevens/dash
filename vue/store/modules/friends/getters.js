const currentUser = (rootGetters) => rootGetters['auth/getCurrentUser']

export default {
  getFriends (state, getters, rootState, rootGetters) {
    const friends = state.friends
    const users = rootState.users.users
    const friendsArray = []

    for (var key in friends) {
      if (friends.hasOwnProperty(key) && users[key]) friendsArray.push({ uid: key, ...users[key] })
    }

    return friendsArray
  }
}
