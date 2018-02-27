exports = ({ functions, admin }) => {

  return functions.database.ref('/messenger/messages/{convoId}/{messageId}').onCreate((event) => {
    console.log('}= ^.^ ={');
    if (!event.data.exists()) {
      return null;
    }

    const message = event.data.val();
    const params = event.params;
    const rootRef = event.data.ref.root;
    const metaRef = rootRef.child('messenger').child('meta');
    console.log('---> ', message);

    return metaRef.child(params.convoId).set(message);
  });

}
