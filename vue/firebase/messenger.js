import firebase, { firebaseRef } from './index'

const indexRef = firebaseRef.child('chat')
const chatsRef = firebaseRef.child('chats')
const userChatsRef = firebaseRef.child('userChats')
const membersRef = firebaseRef.child('members')
const messagesRef = firebase.database().ref('conversations')

export { chatRef, chatsRef, userChatsRef, membersRef, messagesRef }
