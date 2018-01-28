import firebase from '~/firebase'

export default {
  methods: {
    async isEmailTaken (data) {
      try {
        const res = await firebase.auth().fetchProvidersForEmail(data.email)
        console.log('isEmailTaken: ', res)
        return res.length > 0
      }
      catch (e) {
        console.error(e)
      }
    },
    async createUser (data) {
      try {
        const res = await firebase.auth().createUserWithEmailAndPassword(data.email, data.password)
        console.log('createUser res: ', res)
      }
      catch (e) {
        console.error(e)
      }
    },
    async signIn (data) {
      console.log('signIn call')
      try {
        const res = await firebase.auth().signInWithEmailAndPassword(data.email, data.password)
        console.log('signIn res: ', res)
      }
      catch (e) {
        console.error(e)
      }
    },
    async signOut () {
      try {
        console.log('signOut call')
        const res = await firebase.auth().signOut()
        console.log('signed out! ', res)
        this.$store.commit('user/destroyData')
        this.$router.replace('/')
      }
      catch (e) {
        console.error(e)
      }
    }
  }
}
