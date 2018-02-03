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

    database.ref('users').limitToFirst(5).once('value').then(snapshot => success(snapshot), err => error(err))
  },


  fetchUser ({ commit }, uid) {
    const success = (snapshot) => snapshot.forEach(child => commit('addUser', { key: child.key, value: child.val() }))
    const error = (err) => console.error(err)

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
      firstName: 'Zana',
      lastName: 'Dil',
      username: 'Zanadil',
      email: 'thug@life.com',
      profilePicture: 'My pretty face',
      bio: 'I do better dreaming of sunshine'
    }

    try {
      await firebaseRef.update(updateData)
    }
    catch (e) { console.error(e) }
  }

}
