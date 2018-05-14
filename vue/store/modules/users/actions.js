import { database, firebaseRef } from '~/firebase'

const currentUser = (rootGetters) => rootGetters['auth/getCurrentUser']

export default {
  initUsers ({ dispatch }) {
    console.log('initUsers called')
    dispatch('watchUsersAdded')
    dispatch('watchUsersRemoved')
    dispatch('fetchUsers')
    // dispatch('updateCurrentUser')
  },


  fetchUsers ({ commit }) {
    const success = (snapshot) => snapshot.forEach(child => commit('addUser', { key: child.key, value: child.val() }))
    const error = (err) => console.error(err)
    console.log('allUsers!')
    database.ref('users').limitToFirst(100).once('value').then(snapshot => success(snapshot), err => error(err))
  },


  async fetchUser ({ commit, state, dispatch }, uid) {
    try {
      if (state.users[uid]) return
      // console.log('uid: ---> ', uid)
      const snapshot = await database.ref(`users/${uid}`).once('value')
      const data = { key: snapshot.key, value: snapshot.val() }
      // console.log('data: ', data)

      commit('SET_USER', data)
      dispatch('presence/fetchPresence', data.key, { root: true })
    }
    catch (e) {
      console.error(e)
    }
  },


  watchUsersAdded ({ commit }) {
    // const success = (data) => commit('addUser', { key: data.key, value: data.val() })
    // const error = (err) => console.error(err)
    //
    // database.ref(`users`).on('child_added', data => success(data), err => error(err))
  },


  watchUsersRemoved ({ commit }) {
    // const success = (data) => commit('deleteUser', { key: data.key })
    // const error = (err) => console.error(err)
    //
    // database.ref(`users`).on('child_removed', data => success(data), err => error(err))
  },


  async updateCurrentUser ({ commit, rootState, rootGetters }, data) {
    const uid = currentUser(rootGetters).uid
    const user = rootState.auth.currentUser
    console.log('user: , ', user)
    const updateData = {}
    console.log('data: ', data)

    updateData[`users/${user.uid}`] = {
      // firstName: '',
      // lastName: '',
      displayName: data.displayName || user.displayName,
      // email: data.email || '',
      profilePicture: data.photoURL || user.photoURL,
      // bio: ''
    }
    console.log('>>>--->>> ', updateData)

    try {
      await firebaseRef.update(updateData)
      console.log('success')
    } catch (e) { console.error(e) }
  }

}
