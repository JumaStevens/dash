import * as functions from 'firebase-functions'
import * as admin from 'firebase-admin'
import _ from 'lodash'

export const listener = functions.database.ref('/messenger/messages/{convoId}/{messageId}').onDelete(async (event) => {
  try {
    const rootRef = event.data.ref.root
    const parentRef = event.data.ref.parent
    const metaRef = rootRef.child('messenger/meta')
    const adminMetaRef = admin.database().ref('/messenger/meta')
    const convoId = event.params.convoId

    // build data from deleted message
    const previousSnapshot = event.data.previous
    const previousData = {
      timestamp: previousSnapshot.child('timestamp').val(),
      uid: previousSnapshot.child('uid').val()
    }

    // fetch meta message
    const metaSnapshot = await metaRef.child(convoId).once('value')
    const metaData = {
      timestamp: metaSnapshot.child('timestamp').val(),
      uid: metaSnapshot.child('uid').val()
    }

    // continue if deleted and current meta message match
    if (!(previousData.timestamp === metaData.timestamp && previousData.uid === metaData.uid)) return

    // fetch most recent message
    let recentMessage = null
    const messageSnapshot = await parentRef.orderByKey().limitToLast(1).once('value')
    messageSnapshot.forEach(child => recentMessage = child.val())

    // write recent message to meta
    if (_.isEmpty(recentMessage)) return
    const newMessage = await adminMetaRef.child(convoId).set(recentMessage)

    return
  }
  catch (e) {
    console.error(e)
    return
  }

})

// TO DO: what happens when the message deleted was the last of the conversation? (delete convo, clean up meta, members, messages?)
