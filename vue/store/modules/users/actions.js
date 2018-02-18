import { database, firebaseRef } from '~/firebase'

const currentUser = (rootGetters) => rootGetters['auth/getCurrentUser']

export default {
  initUsers ({ dispatch }) {
    dispatch('watchUsersAdded')
    dispatch('watchUsersRemoved')
    dispatch('fetchUsers')
    dispatch('updateCurrentUser')
  },


  fetchUsers ({ commit }) {
    const success = (snapshot) => snapshot.forEach(child => commit('addUser', { key: child.key, value: child.val() }))
    const error = (err) => console.error(err)

    database.ref('users').limitToFirst(100).once('value').then(snapshot => success(snapshot), err => error(err))
  },


  fetchUser ({ commit, state }, uid) {
    const success = (snapshot) => commit('addUser', { key: snapshot.key, value: snapshot.val() })
    const error = (err) => console.error(err)

    if (state.users[uid]) return

    database.ref(`users/${uid}`).once('value').then(snapshot => success(snapshot), err => error(err))
  },


  watchUsersAdded ({ commit }) {
    const success = (data) => commit('addUser', { key: data.key, value: data.val() })
    const error = (err) => console.error(err)

    database.ref(`users`).on('child_added', data => success(data), err => error(err))
  },


  watchUsersRemoved ({ commit }) {
    const success = (data) => commit('deleteUser', { key: data.key })
    const error = (err) => console.error(err)

    database.ref(`users`).on('child_removed', data => success(data), err => error(err))
  },


  async updateCurrentUser ({ commit, rootGetters }, data) {
    const uid = currentUser(rootGetters).uid
    const updateData = {}

    updateData[`users/${uid}`] = {
      firstName: '',
      lastName: '',
      displayName: currentUser(rootGetters).displayName,
      email: currentUser(rootGetters).email,
      profilePicture: currentUser(rootGetters).photoURL,
      bio: ''
    }

    try {
      await firebaseRef.update(updateData)
    } catch (e) { console.error(e) }
  }

}
