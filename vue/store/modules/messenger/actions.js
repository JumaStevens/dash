import { database } from '~/firebase'

export default {
  createConversation (store) {
    const currentUser = store.rootGetters['auth/getCurrentUser']
    database.ref(`conversations/${currentUser.uid}`).push().set(true)
    store.dispatch('watchConversations')
  },
  watchConversations (store) {
    const currentUser = store.rootGetters['auth/getCurrentUser']
    database.ref(`conversations/${currentUser.uid}`).once('child_added', (data) => {
      console.log('child_added: ', data)
    }, (err) => {
      console.error(err)
    })
  }
}
