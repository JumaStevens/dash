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


  fetchPresence ({ commit, rootGetters }, uid) {
    const success = (snapshot) => commit('setPresence', { key: snapshot.key, value: snapshot.val() })
    const error = (err) => console.error(err)

    database.ref(`presence/${uid}`).once('value').then(snapshot => success(snapshot), err => error(err))
  }
}
