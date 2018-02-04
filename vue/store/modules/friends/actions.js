import { database } from '~/firebase'

const currentUser = (rootGetters) => rootGetters['auth/getCurrentUser']

export default {
  initFriends ({ dispatch }) {
    dispatch('watchFriendsAdded')
    dispatch('watchFriendsRemoved')
    dispatch('fetchFriends')
  },


  fetchFriends ({ commit, rootGetters }) {
    const uid = currentUser(rootGetters).uid

    const success = (snapshot) => snapshot.forEach(child => commit('addFriend', { key: child.key, value: child.val() }))
    const error = (err) => console.error(err)

    database.ref(`friends/${uid}`).once('value').then(snapshot => success(snapshot), err => error(err))
  },


  watchFriendsAdded ({ commit, rootGetters }) {
    const uid = currentUser(rootGetters).uid

    const success = (data) => commit('addFriend', { key: data.key, value: data.val() })
    const error = (err) => console.error(err)

    database.ref(`friends/${uid}`).on('child_added', data => success(data), err => error(err))
  },


  watchFriendsRemoved ({ commit, rootGetters }) {
    const uid = currentUser(rootGetters).uid

    const success = (data) => commit('deleteFriend', { key: data.key })
    const error = (err) => console.error(err)

    database.ref(`friends/${uid}`).on('child_removed', data => success(data), err => error(err))
  },


  async addFriend ({ rootGetters }, uid) {
    const currentUserUid = currentUser(rootGetters).uid

    try { await database.ref(`friends/${currentUserUid}/${uid}`).set(true) }
    catch (e) { console.error(e) }
  },


  async deleteFriend ({ rootGetters }, uid) {
    const currentUserUid = currentUser(rootGetters).uid

    try { await database.ref(`friends/${currentUserUid}/${uid}`).set(null) }
    catch (e) { console.error(e) }
  }


}
