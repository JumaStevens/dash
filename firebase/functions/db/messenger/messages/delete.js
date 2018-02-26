const functions = require('firebase-functions');

exports.deleteMeta = functions.database.ref('/messenger/messages/{convoId}/{messageId}').onDelete((event) => {
  console.log('}= ^.^ ={');

  const snapshot = event.data.previous
  const timestamp = snapshot.child('timestamp').val();
  const uid = snapshot.child('uid').val();
  const convoId = event.params.convoId;
  const rootRef = event.data.ref.root;
  const metaRef = rootRef.child('messenger').child('meta');

  return metaRef.child(convoId).once('value').then((snap) => {
    const message = snap;
    const messageTimestamp = message.child('timestamp').val();
    const messageUid = message.child('uid').val();
    console.log('messages --> ', message)

    if (timestamp === messageTimestamp && uid === messageUid) {
      return event.data.ref.parent.orderByKey().limitToLast(1).once('value').then((messageSnap) => {
        console.log('success -=> ', messageSnap.val()[messageSnap.val().key])
        return metaRef.child(convoId).set(messageSnap.val());
      }).catch((err) => {
        console.log('err: ', err);
        return metaRef.child(convoId).set(null);
      });
    }
    else {
      console.log('nothing to see here...')
      return null;
    }
  });
});
