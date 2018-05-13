import userData from '~/data/user.json'

export default {
  isCurrentUser (state) {
    return state.currentUser !== null
  },


  getCurrentUser ({ currentUser }, getters) {
    const user = {
      uid: `${ currentUser.uid || '' }`,
      displayName: `${ currentUser.displayName || '' }`,
      profilePicture: `${ currentUser.photoURL || '' }`
    }

    return user
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
