export default {
  isCurrentUser (state) {
    return state.currentUser !== null
  },
  getCurrentUser (state, getters) {
    const currentUser = {
      uid: '',
      displayName: '',
      photoURL: ''
    }
    return getters.isCurrentUser ? state.currentUser : this.currentUser
  }
}
