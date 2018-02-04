import userData from '~/data/user.json'

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
  },


  getCurrentUserProfilePicture (state, getters) {
    const profilePicture = getters.getCurrentUser.photoURL
    return profilePicture ? profilePicture : userData.defaultProfilePicture
  },


  getCurrentUserDisplayName (state, getters) {
    const displayName = state.currentUser.displayName
    return displayName ? displayName : userData.defaultDisplayName
  }
}
