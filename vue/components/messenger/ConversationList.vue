<template lang='pug'>
div.conversation-list
  ul.list
    li(
      v-for='(item, index) in conversations'
      :key='index'
    ).list__item
      div.list__avatar
        img(
          v-lazy='item.avatarSrc'
        ).list__img
      p.list__text {{ item.fullName }} {{ conversations }}
  a(
    @click='newConversation'
  ) add chat room

</template>


<script>
import firebase, { firebaseRef } from '~/firebase'
import { chatRef, chatsRef, userChatsRef, messagesRef } from '~/firebase/chat'
import chatData from '~/data/chat.json'

export default {
  data () {
    return {
      chatRoom: []
    }
  },
  firebase: {
    conversationsRef: {
      source: userChatsRef,
      readyCallback (e) {
        console.log('ready: ', this.currentUser.uid)
      }
    }
  },
  computed: {
    currentUser () {
      return this.$store.getters['auth/getCurrentUser']
    },
    conversations () {
      console.log('uid: ', this.currentUser.uid)
      firebase.database().ref(`conversations/${this.currentUser.uid}`).on('value', snap => {
        snap.forEach(s => console.log('s: ', s))
        console.log('snap: ', snap.val())
      })
      console.log('old: ', this.$firebaseRefs.conversationsRef)
    }
  },
  methods: {
    setChatRoom () {
      const data = chatData.room
      this.chatRoom = data
    },
    newConversation () {
      this.$store.commit('messenger/setActiveConversationId')
    }
  },
  beforeMount () {
    this.setChatRoom()
  }
}
</script>


<style lang='sass'>
@import '../../assets/sass/main.sass'

.conversation-list
  @extend %flex--column
  align-items: center
  background: $white

.list
  width: 66.66%
  margin-top: 4rem

  &__item
    @extend %flex
    align-items: center
    margin-bottom: 0.5rem
    &:last-child
      margin-bottom: unset

  &__avatar
    @extend %avatar--sm
    margin-right: 0.5rem


</style>
