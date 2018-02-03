import firebase, { database, firebaseRef } from '~/firebase'

const currentUser = (rootGetters) => rootGetters['auth/getCurrentUser']

export default {
  initConversations ({ dispatch }) {
    dispatch('watchConversationsAdded')
    dispatch('watchConversationsRemoved')
    dispatch('fetchConversations')
  },


  fetchConversations ({ commit, dispatch, rootGetters }) {
    const uid = currentUser(rootGetters).uid

    const success = (snapshot) => snapshot.forEach(child => {
      const data = { key: child.key, value: child.val() }

      commit('addConversation', data)
      dispatch('fetchConversationMeta', data.key)
    })

    const error = (err) => console.error(err)

    database.ref(`messenger/conversations/${uid}`).once('value').then(snapshot => success(snapshot), err => error(err))
  },


  fetchConversationMeta ({ commit, rootGetters }, id) {
    const uid = currentUser(rootGetters).uid

    const success = (snapshot) => console.log('meta: ', snapshot)
    const error = (err) => console.error(err)

    database.ref(`messenger/meta/${uid}/${id}`).once('value').then(snapshot => success(snapshot), err => error(err))
  },


  watchConversationsAdded ({ commit, rootGetters }) {
    console.log('#1')
    const uid = currentUser(rootGetters).uid

    const success = (data) => commit('addConversation', { key: data.key, value: data.val() })
    const error = (err) => console.error(err)

    database.ref(`messenger/conversations/${uid}`).on('child_added', data => success(data), err => error(err))
  },


  watchConversationsRemoved ({ commit, rootGetters }) {
    console.log('#2')
    const uid = currentUser(rootGetters).uid

    const success = (data) => commit('deleteConversation', { key: data.key, value: data.val() })
    const error = (err) => console.error(err)

    database.ref(`messenger/conversations/${uid}`).on('child_removed', data => success(data), err => error(err))
  },


  async addNewConversation ({ dispatch, rootGetters }, data) {
    const uid = currentUser(rootGetters).uid
    const key = database.ref(`messenger/conversations/${uid}`).push().key
    const messageKey = database.ref(`messenger/messages/${key}`).push().key
    const updateData = {}
    const members = {}

    data.members.forEach(member => members[member] = true)
    console.log('members: ', members)

    updateData[`messenger/conversations/${uid}/${key}`] = true

    updateData[`messenger/members/${key}`] = data.members

    updateData[`messenger/meta/${key}`] = {
      lastMessage: 'message from bob',
      timestamp: firebase.database.ServerValue.TIMESTAMP,
      uid: `${uid}`
    }

    updateData[`messenger/messages/${key}/${messageKey}`] = {
      message: data.message,
      timestamp: firebase.database.ServerValue.TIMESTAMP,
      uid: `${uid}`

    }

    try {
      await firebaseRef.update(updateData)
    }
    catch (e) { console.error(e) }
  }
}
