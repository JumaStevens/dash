<template lang='pug'>
main.messenger

  // conversation list
  conversation-list.messenger__conversation-list

  // conversation
  //conversation.messenger__conversation
</template>


<script>
import firebase from '~/firebase'
import { chatRef, chatsRef, userChatsRef } from '~/firebase/chat'
import moment from 'moment'
import Conversation from '~/components/messenger/Conversation.vue'
import ConversationList from '~/components/messenger/ConversationList.vue'

export default {
  components: {
    Conversation,
    ConversationList
  },
  data () {
    return {
      chatRoom: [],
      message: '',
      newMessage: '',
      activeConversationId: ''
    }
  },
  methods: {
    addMessage () {
      if (this.newMessage !== '') {
        this.message = this.newMessage.trim()
        chatRef.push({
          message: this.message,
          name: this.currentUser.displayName,
          timestamp: moment().unix(),
          userId: this.currentUser.uid,
          photo_url: this.currentUser.photoURL || 'empty'
        })
        this.newMessage = ''
      }
    },
    deleteMessage (item) {
      this.$firebaseRefs.anArray.child(item['.key']).remove()
    },
    addChatRoom () {
      const userChats = this.$firebaseRefs.userChats
      const key = userChats.push().key
      userChats.child(this.currentUser.uid).child(key).set(true)

      console.log('key: ', key)
    },

  },
  computed: {
    currentUser () {
      const user = this.$store.getters['auth/getCurrentUser']
      console.log('currentUser: ---> ', user)
      return user
    },
    activeConversation () {
      return this.$firebaseRefs.anArray.child(this.activeConversationId)
    }
  },
  firebase: {
    anArray: {
      source: chatRef,
      cancelCallback (e) {
        console.log('canceled! ', e)
      },
      readyCallback (e) {
        console.log('readyCallback! ', e)
      }
    },
    chats: {
      source: chatsRef,
      cancelCallback (e) {
        console.log('canceled! ', e)
      },
      readyCallback (e) {
        console.log('readyCallback! ', chatsRef)
        console.log(this.$firebaseRefs.chats)
      }
    },
    userChats: {
      source: userChatsRef,
      cancelCallback (e) {
        console.log('canceled! ', e)
      },
      readyCallback (e) {
        console.log('readyCallback! ', chatsRef)
        console.log(this.$firebaseRefs.chats)
      }
    }
  }
}
</script>


<style lang='sass' scoped>
@import '../assets/sass/main.sass'

.messenger
  background: $pri-cl
  @extend %flex
  box-shadow: 0px 0px 0.5rem rgba(33, 33, 33, 0.2)
  border-radius: 0.75%
  overflow: hidden

  &__conversation-list
    flex: 2

  &__conversation
    flex: 3

</style>
