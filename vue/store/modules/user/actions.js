import firebase from '~/firebase'
import { presence } from '~/firebase/presence'

export default {
  watchAuthState ({ commit, dispatch }) {
    const observer = (user) => {
      if (user) {
        commit('setCurrentUser')
        dispatch('watchPresence')
      } else {
        commit('clearCurrentUser')
        dispatch('signInAnonymously')
      }
    }
    firebase.auth().onAuthStateChanged(observer)
  },
  watchPresence () {
    presence()
    console.log('watchPresence')
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
  }
}
