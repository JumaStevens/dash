const functions = require('firebase-functions');
const admin = require('./../../../admin');

exports = module.exports = functions.database.ref('/messenger/messages/{convoId}/{messageId}').onCreate((event) => {

  if (!event.data.exists()) return null;

  const message = event.data.val();
  const params = event.params;
  const rootRef = event.data.ref.root;
  const metaRef = rootRef.child('messenger').child('meta');
  console.log('---> ', message.value);

  return metaRef.child(params.convoId).set(message);

});
