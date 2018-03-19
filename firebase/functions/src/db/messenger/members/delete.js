import * as functions from 'firebase-functions'
import * as admin from 'firebase-admin'
import _ from 'lodash'


export const listener = functions.database.ref('/messenger/members/{convoId}/{uid}').onDelete(async (event) => {
  try {

    console.log('currentUser: ', event.auth)
    const authUid = event.auth.variable ? event.auth.variable.uid : null
    const uid = event.params.uid
    const convoId = event.params.convoId

    // database refs
    const adminConversationsRef = admin.database().ref('/messenger/conversations')
    const adminMembersRef = admin.database().ref('/messenger/members')
    const adminPendingRef = admin.database().ref('/messenger/pending')
    const adminMessageRef = admin.database().ref('/messenger/messages')

    // auth user data
    const authUserSnapshot = await admin.auth().getUser(authUid)
    console.log('authUserSnapshot: ', authUserSnapshot)
    const authUserRecord = authUserSnapshot.toJSON()
    console.log('authUserRecord: ', authUserRecord)
    console.log('authDisplayName: ', authUserRecord.displayName)

    // uid user data
    const userSnapshot = await admin.auth().getUser(uid)
    const userRecord = userSnapshot.toJSON()
    console.log('userSnapshot: ', userSnapshot)
    console.log('userRecord: ', userRecord)


    if (authUid === uid) {

      const membersSnapshot = await adminMembersRef.child(convoId).once('value')
      const membersCount = membersSnapshot.numChildren()

      // clean up conversation
      if (!membersCount) {
        console.log('clean up')
      }


    }
    else {

      const conversationsSnapshot = await adminConversationsRef.child(uid).once('value')
      const pendingSnapshot = await adminPendingRef.child(uid).once('value')
      console.log('conversationsSnapshot: ', conversationsSnapshot)
      console.log('pendingSnapshot: ', pendingSnapshot)

      if (conversationsSnapshot.hasChild(convoId)) {

      }
      else if (pendingSnapshot.hasChild(convoId)) {
        await adminPendingRef.child(`${uid}/${convoId}`).set(null)

      }

      //
      const botMessage = {
        message: `${authUserRecord.displayName} removed ${userRecord.displayName} from the conversation.`,
        timestamp: admin.database.ServerValue.TIMESTAMP,
        uid: 'bot'
      }

      await adminMessageRef.child(convoId).push().set(botMessage)




    }




    // const rootRef = event.data.ref.root
    // const parentRef = event.data.ref.parent
    // const metaRef = rootRef.child('messenger/meta')
    // const adminMetaRef = admin.database().ref('/messenger/meta')
    // const convoId = event.params.convoId
    //
    // // build data from deleted message
    // const previousSnapshot = event.data.previous
    // const previousData = {
    //   timestamp: previousSnapshot.child('timestamp').val(),
    //   uid: previousSnapshot.child('uid').val()
    // }
    //
    // // fetch meta message
    // const metaSnapshot = await metaRef.child(convoId).once('value')
    // const metaData = {
    //   timestamp: metaSnapshot.child('timestamp').val(),
    //   uid: metaSnapshot.child('uid').val()
    // }
    //
    // // continue if deleted and current meta message match
    // if (!(previousData.timestamp === metaData.timestamp && previousData.uid === metaData.uid)) return
    //
    // // fetch most recent message
    // let recentMessage = null
    // const messageSnapshot = await parentRef.orderByKey().limitToLast(1).once('value')
    // messageSnapshot.forEach(child => recentMessage = child.val())
    //
    // // write recent message to meta
    // if (_.isEmpty(recentMessage)) return
    // const newMessage = await adminMetaRef.child(convoId).set(recentMessage)

    return
  }
  catch (e) {
    console.error(e)
    return
  }

})
