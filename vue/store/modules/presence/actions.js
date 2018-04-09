import firebase, { database } from '~/firebase'

const currentUser = (rootGetters) => rootGetters['auth/getCurrentUser']

export default {
  authPresence ({ commit, rootGetters }) {
    const uid = currentUser(rootGetters).uid
    const presenceRef = database.ref(`presence/${uid}`)
    const timestamp = firebase.database.ServerValue.TIMESTAMP

    const isOfflineData = {
      online: false,
      lastChanged: timestamp
    }

    const isOnlineData = {
      online: true,
      lastChanged: timestamp
    }

    database.ref('.info/connected').on('value', snapshot => {
      // if we're not currently connected, don't do anything
      if (!snapshot.val()) return
      presenceRef.onDisconnect().set(isOfflineData).then(() => presenceRef.set(isOnlineData)).catch(e => console.error(e))
    })
  },


  async fetchPresence ({ commit, state, rootGetters }, uid) {
    try {
      if (state.presence[uid]) return

      const snapshot = await database.ref(`presence/${uid}`).once('value')
      const data = { key: snapshot.key, value: snapshot.val() }
      commit('setPresence', data)
    }
    catch (e) {
      console.error(e)
    }
  }
}
