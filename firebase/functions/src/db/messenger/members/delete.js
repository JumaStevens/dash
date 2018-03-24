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

      // add bot message to conversation
      if (membersCount) {
        const botMessage = {
          message: `${authUserRecord.displayName} lefted the conversation.`,
          timestamp: admin.database.ServerValue.TIMESTAMP,
          uid: 'bot'
        }

        await adminMessageRef.child(convoId).push().set(botMessage)
      }
      // clean up empty conversation traces
      else {
        console.log('clean up')
      }

    }
    else {

      const conversationsSnapshot = await adminConversationsRef.child(uid).once('value')
      const pendingSnapshot = await adminPendingRef.child(uid).once('value')
      console.log('conversationsSnapshot: ', conversationsSnapshot)
      console.log('pendingSnapshot: ', pendingSnapshot)

      if (conversationsSnapshot.hasChild(convoId)) {
        await adminConversationsRef.child(`${uid}/${convoId}`).set(null)
      }
      else if (pendingSnapshot.hasChild(convoId)) {
        await adminPendingRef.child(`${uid}/${convoId}`).set(null)

      }

      // add bot message to conversation
      const botMessage = {
        message: `${authUserRecord.displayName} removed ${userRecord.displayName} from the conversation.`,
        timestamp: admin.database.ServerValue.TIMESTAMP,
        uid: 'bot'
      }

      await adminMessageRef.child(convoId).push().set(botMessage)

    }

    return
  }
  catch (e) {
    console.error(e)
    return
  }

})
