export default {
  activeConversation: '',
  conversations: {
    'id': true
  },
  messages: {
    'id': {
      'messageId': {
        text: '',
        timestamp: '',
        data: '',
        uid: ''
      }
    }
  },
  members: {
    'id': {
      'uid': true
    }
  },
  meta: {
    'id': {
      lastMessage: '',
      timestamp: '',
      uid: ''
    }
  }
}



// export default {
//   activeConversation: '',
//   conversations: [
//     {
//       id: '', // the conversation id
//       messages: [
//         {
//           id: '', // the message id
//           text: '',
//           uid: '', // the user id
//           timestamp: '',
//           data: ''
//         }
//       ],
//       members: [
//         {
//           uid: '', // the user id
//           firstName: '',
//           lastName: '',
//           profileUrl: '',
//           lastMessageId: ''
//         }
//       ],
//       lastMessage: {
//         id: '', // the message id
//         text: '',
//         uid: '', // the user id
//         timestamp: '',
//         data: ''
//       }
//     }
//   ]
// }
