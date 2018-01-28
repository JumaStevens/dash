import firebase from '~/firebase'

export default {
  watchAuthState ({ commit }) {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        console.log('user >>> ', user.toJSON())
        commit('setData', user.toJSON())
      } else {
        //const res = firebase.auth().signInAnonymously()
        //this.$store.commit('user/setData', res)
        console.log('user false: ')
      }
    })
  }
}
