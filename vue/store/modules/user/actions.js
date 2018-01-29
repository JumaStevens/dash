import firebase from '~/firebase'
import { presence } from '~/firebase/presence'

export default {
  async watchAuthState ({ commit, dispatch }) {
    const handleChange = (user) => {
      if (user) {
        console.log('user >>> ', user.toJSON())
        commit('setData', user.toJSON())
        dispatch('watchPresence')
      } else {
        const res = firebase.auth().signInAnonymously()
        this.$store.commit('user/setData', res)
        console.log('user false: ', res)
      }
    }

    try {
      const authState = await firebase.auth().onAuthStateChanged(handleChange)
    }
    catch (e) {
      console.error(e)
    }
  },
  watchPresence () {
    presence()
    console.log('watchPresence')
  }
}
