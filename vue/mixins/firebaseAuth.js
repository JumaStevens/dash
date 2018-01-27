import firebase from '../utils/firebase'

export default {
  methods: {
    async isEmailTaken (data) {
      try {
        const res = await firebase.auth().fetchProvidersForEmail(data.email)
        console.log('isEmailTaken: ', isEmailTaken)
        return res.length > 0
      }
      catch (e) {
        console.log('checkUserExist error: ', e)
      }
    },
    async createUser (data) {
      try {
        const res = await firebase.auth().createUserWithEmailAndPassword(data.email, data.password)
        console.log('createUser res: ', res)
      }
      catch (e) {
        console.log('createUser error: ', e)
      }
    },
    async signIn (data) {
      try {
        const res = await firebase.auth().signInWithEmailAndPassword(data.email, data.password)
        return res
      }
      catch (e) {
        console.log('signIn error: ', e)
      }
    },
    async signOut () {
      try {
        const res = await firebase.auth().signOut()
        this.$router.replace('/')
      }
      catch (e) {
        console.log('signOut error: ', e)
      }
    },
    async initAuth () {
      try {
        const user = await firebase.auth().onAuthStateChanged()
        if (user) {
          console.log('initAuth: ', user)
        }
        else {
          const res = await firebase.auth().signInAnonymously()
        }
      }
      catch (e) {
        console.log('initAuth error: ', e)
      }
    }
  }
}
