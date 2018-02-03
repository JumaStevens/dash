export default {
  getConversations (state) {
    const data = {

    }
    const c = state.conversations
    c.forEach(conversation => {

    })
  },
  getlastMessages (state) {
    // return the last message of all conversations
    state.conversations


  }
}

// init getting conversations from firebase by first retrieving all userConversations, than grabbing a the meta for each. Minimal info needed for initial render of UI. Only load full message when on 'opening' of a conversation
