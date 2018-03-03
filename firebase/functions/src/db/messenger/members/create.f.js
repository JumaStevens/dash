import * as functions from 'firebase-functions'
import * as admin from 'firebase-admin'


export const handler = functions.database.ref('/messenger/members/{convoId}/{uid}').onCreate((event) => {

  if (!event.data.exists()) return null;

  const convoId = event.params.convoId;
  const uid = event.params.uid;

  console.log('convoId: ', convoId);
  console.log('uid: ', uid);
  console.log('params: ', event.params);

  return admin.database().ref(`/messenger/conversations/${uid}`).once('value').then((snap) => {

    if (snap.hasChild(convoId)) return null;

    const rootRef = event.data.ref.root;
    const pendingData = { [convoId]: true };

    console.log('got ref back!')
    return rootRef.child('messenger').child('pending').child(uid).set(pendingData);
  }).catch(err => {
    console.log('writePending error!')
    console.log('err: ', err);
    return null;
  });

});
