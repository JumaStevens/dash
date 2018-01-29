import firebase, { firebaseRef } from './index'

// const uid = firebase.auth().currentUser.uid
// console.log('uid: ', uid)

const chatRef = firebaseRef.child('chat')
const chatsRef = chatRef.child('chats')
const userChatsRef = chatRef.child('userChats')
const membersRef = chatRef.child('members')
const messagesRef = chatRef.child('messages')

export { chatRef, chatsRef, userChatsRef, membersRef, messagesRef }
