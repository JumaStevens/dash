import { database } from '~/firebase'

const currentUser = (rootGetters) => rootGetters['auth/getCurrentUser']

export default {
  createConversation ({ dispatch, rootGetters }) {
    const uid = currentUser(rootGetters).uid

    database.ref(`conversations/${uid}`).push().set(true)

    dispatch('watchConversations')
  },


  watchConversations ({ commit, rootGetters }) {
    const uid = currentUser(rootGetters).uid

    const success = (data) => commit('addConversation', { key: data.key, value: data.val() })
    const error = (err) => console.error(err)

    database.ref(`conversations/${uid}`).once('child_added', data => success(data), err => error(err))
  },


  getConversations ({ commit, dispatch, rootGetters }) {
    const uid = currentUser(rootGetters).uid

    const success = (snapshot) => {
      commit('setConversations', snapshot.val())
      //snapshot.forEach(child => dispatch('getConversationMeta', child.key))
    }
    const error = (err) => console.error(err)

    database.ref(`conversations/${uid}`).once('value').then(snapshot => success(snapshot), err => error(err))
  },


  getConversationMeta ({ commit, rootGetters }, id) {
    const uid = currentUser(rootGetters).uid

    const success = (snapshot) => console.log('meta: ', snapshot)
    const error = (err) => console.error(err)

    database.ref(`meta/${uid}/${id}`).once('value').then(snapshot => success(snapshot), err => error(err))
  }
}
