import firebase, { database, firebaseRef } from '~/firebase'
import _ from 'lodash'

const currentUser = (rootGetters) => rootGetters['auth/getCurrentUser']

const db = {
  conversations: database.ref(`messenger/conversations`),
  members: database.ref(`messenger/members`),
  meta: database.ref(`messenger/meta`),
  messages: database.ref(`messenger/messages`),
  pending: database.ref(`messenger/pending`)
}


export default {
  async init ({ dispatch, state }) {
    try {
      const conversations = state.conversations
      const meta = state.meta

      // fetch all conversations/pending of user
      await Promise.all([ dispatch('fetchConversations'), dispatch('fetchPending') ])

      // fetch meta for each conversation
      for (let key in conversations) {
        if (conversations.hasOwnProperty(key)) {
          await Promise.all([ dispatch('fetchMeta', key), dispatch('fetchMembers', key) ])
        }
      }

      // fetch user for each meta
      for (let key in meta) {
        if (meta.hasOwnProperty(key)) {
          const uid = meta[key].uid
          await dispatch('users/fetchUser', uid, { root: true })
        }
      }

    }
    catch (e) {
      console.error(e)
    }

  },


  // CONVERSATIONS
  async fetchConversations ({ commit, state, dispatch, rootGetters }) {
    try {
      if (!_.isEmpty(state.conversations)) return

      const uid = currentUser(rootGetters).uid
      const snapshot = await db.conversations.child(uid).once('value')
      snapshot.forEach(child => commit('SET_CONVERSATION', { key: child.key, value: child.val() }))
      dispatch('watchConversationsAdded')
      dispatch('watchConversationsRemoved')
    }
    catch (e) {
      console.error(e)
    }
  },


  watchConversationsAdded ({ commit, rootGetters }) {
    const uid = currentUser(rootGetters).uid

    const success = (snapshot) => commit('SET_CONVERSATION', { key: snapshot.key, value: snapshot.val() })
    const error = (e) => console.error(e)

    db.conversations.child(uid).on('child_added', snapshot => success(snapshot), e => error(e))
  },


  watchConversationsRemoved ({ commit, rootGetters }) {
    const uid = currentUser(rootGetters).uid

    const success = (snapshot) => commit('DELETE_CONVERSATION', { key: snapshot.key })
    const error = (err) => console.error(err)

    db.conversations.child(uid).on('child_removed', snapshot => success(snapshot), e => error(e))
  },


  // META
  async fetchMeta ({ commit, state, dispatch }, convoId) {
    try {
      if (state.meta[convoId]) return
      console.log('fetchMeta: ', convoId)

      const snapshot = await db.meta.child(convoId).once('value')
      const data = { key: snapshot.key, value: snapshot.val() }

      if (data.value) commit('SET_META', data)
      dispatch('watchMeta', snapshot.key)
    }
    catch (e) {
      console.error(e)
    }
  },


  watchMeta ({ commit }, convoId) {
    const success = (snapshot) => {
      const data = { key: snapshot.key, value: snapshot.val() }
      data.value === null ? commit('DELETE_META', { key: data.key }) : commit('SET_META', data)
    }
    const error = (e) => console.error(e)

    db.meta.child(convoId).on('value', snapshot => success(snapshot), e => error(e))
  },


  // MEMBERS
  async fetchMembers ({ commit, state, dispatch }, convoId) {
    try {
      if (state.members[convoId]) return
      const snapshot = await db.members.child(convoId).once('value')
      snapshot.forEach(child => commit('SET_MEMBERS', { convoId, key: child.key, value: child.val() }))
      dispatch('watchMembersAdded', convoId)
      dispatch('watchMembersRemoved', convoId)
    }
    catch (e) {
      console.error(e)
    }
  },


  watchMembersAdded ({ commit }, convoId) {
    const success = (snapshot) => commit('SET_MEMBERS', { convoId, key: snapshot.key, value: snapshot.val() })
    const error = (e) => console.error(e)
    console.log(convoId, ' ....++')
    db.members.child(convoId).on('child_added', snapshot => success(snapshot), e => error(e))
  },


  watchMembersRemoved ({ commit }, convoId) {
    const success = (snapshot) => {
      console.log('fired!!')
      commit('DELETE_MEMBERS', { convoId, key: snapshot.key })
    }
    const error = (e) => console.error(e)
    console.log(convoId, ' ....><')
    db.members.child(convoId).on('child_removed', snapshot => success(snapshot), err => error(err))
  },


  // PENDING
  async fetchPending ({ commit, state, dispatch, rootGetters }) {
    try {
      if (state.pending[uid]) return

      const uid = currentUser(rootGetters).uid
      const snapshot = await db.pending.child(uid).once('value')

      snapshot.forEach(child => commit('SET_PENDING', { key: child.key, value: child.val() }))

      dispatch('watchPendingAdded')
      dispatch('watchPendingRemoved')
    }
    catch (e) {
      console.error(e)
    }
  },


  watchPendingAdded ({ commit, rootGetters }) {
    const uid = currentUser(rootGetters).uid

    const success = (snapshot) => commit('SET_PENDING', { key: snapshot.key, value: snapshot.val() })
    const error = (e) => console.error(e)

    db.pending.child(uid).on('child_added', snapshot => success(snapshot), e => error(e))
  },


  watchPendingRemoved ({ commit, rootGetters }) {
    const uid = currentUser(rootGetters).uid

    const success = (snapshot) => commit('DELETE_PENDING', { key: snapshot.key })
    const error = (err) => console.error(err)

    db.pending.child(uid).on('child_removed', snapshot => success(snapshot), e => error(e))
  },


  // MESSAGES
  async fetchMessages ({ commit, state, dispatch }, convoId) {
    try {
      if (state.messages[convoId]) return

      const snapshot = await db.messages.child(convoId).once('value')
      snapshot.forEach(child => commit('SET_MESSAGE', { convoId, key: child.key, value: child.val() }))
      dispatch('watchMessagesAdded', convoId)
      dispatch('watchMessagesRemoved', convoId)
    }
    catch (e) {
      console.error(e)
    }
  },


  watchMessagesAdded ({ commit, rootGetters }, convoId) {
    const success = (snapshot) => commit('SET_MESSAGE', { convoId, key: snapshot.key, value: snapshot.val() })
    const error = (e) => console.error(e)

    db.messages.child(convoId).orderByChild('timestamp').startAt(Date.now()).on('child_added', snapshot => success(snapshot), e => error(e))
  },


  watchMessagesRemoved ({ commit }, convoId) {
    const success = (snapshot) => commit('DELETE_MESSAGES', { key: snapshot.key })
    const error = (err) => console.error(err)

    db.messages.child(convoId).on('child_removed', snapshot => success(snapshot), e => error(e))
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

    updateData[`messenger/messages/${key}/${messageKey}`] = {
      message: data.message,
      timestamp: firebase.database.ServerValue.TIMESTAMP,
      uid
    }

    try {
      await firebaseRef.update(updateData)
    }
    catch (e) { console.error(e) }
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


      await database.ref(`messenger/messages/${id}`).push(messageData)
    }
    catch (e) { console.error(e) }

  }
}
