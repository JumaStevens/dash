import firebase, { database } from '~/firebase'

const currentUser = () => firebase.auth().currentUser

export default {
  watchAuthState ({ commit, dispatch }) {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        commit('setCurrentUser')
        dispatch('watchPresence')
      } else {
        commit('clearCurrentUser')
        dispatch('signInAnonymously')
      }
    })
  },


  watchPresence ({ commit, rootGetters}) {
    const uid = currentUser().uid
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


  async signInAnonymously () {
    try { await firebase.auth().signInAnonymously() }
    catch (e) { console.error(e) }
  },


  async createUserWithEmailAndPassword ({}, payload) {
    try { await firebase.auth().createUserWithEmailAndPassword(payload.email, payload.password) }
    catch (e) { console.error(e) }
  },


  async signInWithEmailAndPassword ({}, payload) {
    try { await firebase.auth().signInWithEmailAndPassword(payload.email, payload.password) }
    catch (e) { console.error(e) }
  },


  async signOut () {
    try { await firebase.auth().signOut() }
    catch (e) { console.error(e) }
  },


  async updateProfile ({}, payload) {
    try { await currentUser().updateProfile(payload) }
    catch (e) { console.error(e) }
  },


  async updateEmail ({}, payload) {
    try { await currentUser().updateEmail(payload.newEmail) }
    catch (e) { console.error(e) }
  },


  async sendEmailVerification ({}, payload) {
    try { await currentUser().useDeviceLanguage().sendEmailVerification() }
    catch (e) { console.error(e) }
  },


  async updatePassword ({}, payload) {
    try { await currentUser().updatePassword(payload.newPassword) }
    catch (e) { console.error(e) }
  },


  async sendPasswordResetEmail ({}, payload) {
    try { await currentUser().sendPasswordResetEmail(currentUser().email) }
    catch (e) { console.error(e) }
  },


  async deleteUserAccount ({ commit }, payload) {
    try {
      await currentUser().delete()
      commit('clearCurrentUser')
    }
    catch (e) { console.error(e) }
  },


  async reauthenticateWithCredential ({}, payload) {
    try { await currentUser().reauthenticateWithCredential(payload.credential) }
    catch (e) { console.error(e) }
  }
}
