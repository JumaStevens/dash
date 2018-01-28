import firebase, { firebaseRef } from './index'

export const presence = () => {
  const uid = firebase.auth().currentUser.uid
  const statusRef = firebaseRef.child(`presence/${uid}`)
  const timestamp = firebase.database.ServerValue.TIMESTAMP

  const isOfflineData = {
    state: 'offline',
    last_changed: timestamp
  }

  const isOnlineData = {
    state: 'online',
    last_changed: timestamp
  }

  firebaseRef.child('.info/connected').on('value', snapshot => {
    // if we're not currently connected, don't do anything
    if (!snapshot.val()) return
    statusRef.onDisconnect().set(isOfflineData).then(() => statusRef.set(isOnlineData)).catch(e => console.error(e))
  })
}
