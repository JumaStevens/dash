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

      dispatch('fetchConversationMembers', data.key)

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


  fetchConversationMembers ({ commit }, id) {
    const success = (snapshot) => commit('setMembers', { key: snapshot.key, value: snapshot.val() })
    const error = (err) => console.error(err)

    database.ref(`messenger/members/${id}`).on('value', snapshot => success(snapshot), err => error(err))
  },


  fetchPending ({ commit, dispatch, rootGetters }) {
    const uid = currentUser(rootGetters).uid

    const success = (snapshot) => snapshot.forEach(child => {

      const data = { key: child.key, value: child.val() }

      commit('setConversation', data)

      dispatch('fetchConversationMeta', data.key)

      dispatch('fetchConversationMembers', data.key)

    })

    const error = (err) => console.error(err)

    database.ref(`messenger/conversations/${uid}`).once('value').then(snapshot => success(snapshot), err => error(err))
  },


  async addNewConversation ({ dispatch, rootGetters, state }, data) {
    const uid = currentUser(rootGetters).uid
    const key = database.ref(`messenger/conversations/${uid}`).push().key
    const messageKey = database.ref(`messenger/messages/${key}`).push().key
    const updateData = {}
    const newMembers = state.app.newMembers
    const members = { [uid]: true, ...newMembers }

    updateData[`messenger/conversations/${uid}/${key}`] = true

    updateData[`messenger/members/${key}`] = members

    // updateData[`messenger/meta/${key}`] = {
    //   lastMessage: data.message,
    //   timestamp: firebase.database.ServerValue.TIMESTAMP,
    //   uid: `${uid}`
    // }

    updateData[`messenger/messages/${key}/${messageKey}`] = {
      message: data.message,
      timestamp: firebase.database.ServerValue.TIMESTAMP,
      uid: `${uid}`
    }

    // for (let uidKey in newMembers) {
    //   if (newMembers.hasOwnProperty(uidKey)) updateData[`messenger/pending/${uidKey}/${key}`] = true
    // }

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


  async addNewMessage ({ commit, state, rootState, rootGetters }, data) {
    try {
      const uid = currentUser(rootGetters).uid
      const id = rootState.route.params.id
      const key = database.ref(`messenger/messages/${id}`).push().key
      const timestamp = firebase.database.ServerValue.TIMESTAMP
      const messageData = {
        uid,
        timestamp,
        ...data
      }
      // TO DO: update meta as well

      await database.ref(`messenger/messages/${id}`).push(messageData)
    }
    catch (e) { console.error(e) }

  }
}
