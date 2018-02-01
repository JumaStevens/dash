import firebase from '~/firebase'

export default {
  setCurrentUser (state) {
    const user = firebase.auth().currentUser
    if (!user) return;
    state.currentUser = user.toJSON()
    console.log('setCurrentUser: ', user.toJSON())
  },
  clearCurrentUser (state) {
    state.currentUser = null
    console.log('clearCurrentUser')
  }
}
