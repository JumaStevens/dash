import firebase, { database, firebaseRef } from '~/firebase'

const currentUser = (rootGetters) => rootGetters['auth/getCurrentUser']

export default {
  initConversations ({ dispatch }) {
    dispatch('watchConversationsAdded')
    dispatch('watchConversationsRemoved')
    dispatch('watchConversationMetaAdded')
    dispatch('watchConversationMetaRemoved')
    dispatch('fetchConversations')
  },


  fetchConversations ({ commit, dispatch, rootGetters }) {
    const uid = currentUser(rootGetters).uid

    const success = (snapshot) => snapshot.forEach(child => {

      const data = { key: child.key, value: child.val() }

      commit('setConversation', data)

      dispatch('fetchConversationMeta', data.key)
    })

    const error = (err) => console.error(err)

    database.ref(`messenger/conversations/${uid}`).once('value').then(snapshot => success(snapshot), err => error(err))
  },


  fetchConversationMeta ({ commit, rootGetters }, id) {
    const uid = currentUser(rootGetters).uid

    const success = (snapshot) => commit('setConversationMeta', { key: snapshot.key, value: snapshot.val() })

    const error = (err) => console.error(err)

    database.ref(`messenger/meta/${id}`).once('value').then(snapshot => success(snapshot), err => error(err))
  },


  watchConversationMetaAdded ({ commit, rootGetters }) {
    const uid = currentUser(rootGetters).uid

    const success = (data) => commit('setConversationMeta', { key: data.key, value: data.val() })
    const error = (err) => console.error(err)

    database.ref(`messenger/meta`).orderByChild('timestamp').on('child_added', data => success(data), err => error(err))
  },


  watchConversationMetaRemoved ({ commit, rootGetters }) {
    const uid = currentUser(rootGetters).uid

    const success = (data) => commit('deleteConversationMeta', { key: data.key, value: data.val() })
    const error = (err) => console.error(err)

    database.ref(`messenger/meta`).orderByChild('timestamp').limitToLast(2).on('child_removed', data => success(data), err => error(err))
  },


  watchConversationsAdded ({ commit, rootGetters }) {
    const uid = currentUser(rootGetters).uid

    const success = (data) => commit('setConversation', { key: data.key, value: data.val() })
    const error = (err) => console.error(err)

    database.ref(`messenger/conversations/${uid}`).on('child_added', data => success(data), err => error(err))
  },


  watchConversationsRemoved ({ commit, rootGetters }) {
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
    const members = { [uid]: true }
    console.log('data: ', data)

    data.members.forEach(member => members[member] = true)
    console.log('members: ', members)

    updateData[`messenger/conversations/${uid}/${key}`] = true

    updateData[`messenger/members/${key}`] = members

    updateData[`messenger/meta/${key}`] = {
      lastMessage: data.message,
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
  },


  fetchMessages ({ commit }, id) {
    const success = (snapshot) => commit('setMessages', { key: snapshot.key, value: snapshot.val() })

    const error = (err) => console.error(err)

    database.ref(`messenger/messages/${id}`).on('value', snapshot => success(snapshot), err => error(err))
  },


  async addNewMessage ({ commit, state, rootState }, data) {
    try {
      console.log('data ---> ', data)
      const id = rootState.route.params.id
      console.log('state convo id: ', id)
      const key = database.ref(`messenger/messages/${id}`).push().key
      const messageData = {}
      messageData[key] = { ...data }
      console.log('messageData: ', messageData)
      await database.ref(`messenger/messages/${id}`).push(data)
    }
    catch (e) { console.error(e) }

  }
}
