import * as functions from 'firebase-functions'
import * as admin from 'firebase-admin'

export const listener = functions.database.ref('/messenger/messages/{convoId}/{messageId}').onCreate(async (event) => {
  try {

    if (!event.data.exists()) return

    const db = admin.database()
    const convoId = event.params.convoId
    const message = event.data.val()

    await db.ref(`messenger/meta/${convoId}`).set(message)

    console.log('message --> ', message)
    
    return
  }
  catch (e) {
    console.error(e)
    return
  }

});
