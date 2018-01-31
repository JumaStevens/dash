<template lang='pug'>
main.chat

  // room
  aside.chat__room
    div.room
      ul.room__list
        li(
          v-for='(item, index) in chatRoom'
          :key='index'
        ).room__item
          div.room__avatar
            img(
              v-lazy='item.avatarSrc'
            ).room__img
          p.room__text {{ item.fullName }}

  // header
  div.chat__header
    header.header
      div.header__avatar
        img(
          v-lazy='chatRoom[0].avatarSrc'
        ).header__image
      p.header__text name dawg
      p.header__status Active

  // message
  div.chat__message
    div.message
      ul.message__list
        li(
          v-for='(item, index) in anArray'
          :key='index'
        ).message__item
          p(
            @click='deleteMessage(item)'
          ).message__text {{ item.message }}
          p {{ item.timestamp | formatDate }}

  // message form
  div.chat__message-form
    form(
      @submit.prevent='addMessage'
    ).message-form
      input(
        v-model='newMessage'
        placeholder='Type a message...'
      ).message-form__input
</template>


<script>
import chatData from '~/data/chat.json'
import firebase from '~/firebase'
import { chatRef, chatsRef } from '~/firebase/chat'
import moment from 'moment'

const peer = new Peer({host: 'localhost', port: 4000, path: '/peerjs' })
const conn = peer.connect()

// connect
conn.on('open', () => {
  console.log('open')
  conn.send('hi!')
})

peer.listAllPeers((e) => { console.log('list: ', e) })

// receive
conn.on('connection', (conn) => {
  conn.on('data', (data) => {
    console.log('data: ', data)
  })
})


export default {
  data () {
    return {
      chatRoom: [],
      message: '',
      newMessage: ''
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
    getUserId () {
      return firebase.auth().currentUser.uid
    },
    getUserName () {
      return firebase.auth().currentUser.displayName
    },
    getPhotoUrl () {
      return firebase.auth().currentUser.photoURL
    },
    setChatRoom () {
      const data = chatData.room
      this.chatRoom = data
    },
    joinRoom () {
      this.$socket.emit('chatJoin', 'winners')
    },
    leaveRoom () {
      this.$socket.emit('chatLeave')
    },
    sendMessage () {
      this.$socket.emit('chatMessage', this.inputMessage)
    }
  },
  computed: {
    currentUser () {
      const user = this.$store.getters['user/getCurrentUser']
      console.log('currentUser: ---> ', user)
      return user
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
    }
  },
  sockets: {
    connect () {
      console.log('socket connected')
    },
    disconnect () {
      console.log('socket disconnected')
    },
    error () {
      console.log('socket error')
    },
    chatUserDisconnected () {
      console.log('user disconnected')
    },
    chatJoined (val) {
      console.log('chatJoined: ', val)
    },
    chatLeft () {
      console.log('chatLeft')
    },
    chatNewConnection () {
      console.log('chatNewConnection')
    },
    chatMessage (e) {
      console.log('chatMessage: ', e)
    }
  },
  created () {
    this.joinRoom()
  },
  beforeMount () {
    this.setChatRoom()
    console.log('active: ', this.$store.state.user.data)
  },
  beforeDestroy () {
    this.leaveRoom()
  }
}
</script>


<style lang='sass' scoped>
@import '../assets/sass/main.sass'

.chat
  background: $pri-cl
  display: grid
  grid-template-rows: minmax(3rem, 6rem) 1fr minmax(3rem, 6rem)
  grid-template-columns: minmax(10rem, 16rem) 1fr
  box-shadow: 0px 0px 0.5rem rgba(33, 33, 33, 0.2)
  border-radius: 0.75%
  overflow: hidden

  &__room
    background: $white
    grid-row: 1 / 4
    grid-column: 1 / 2
    @extend %flex--column
    align-items: center

  &__header
    grid-row: 1 / 2
    grid-column: 2 / 3
    @extend %flex
    align-items: center

  &__message
    grid-row: 2 / 3
    grid-column: 2 / 3
    overflow-y: auto

  &__message-form
    grid-row: 3 / 4
    grid-column: 2 / 3

  &__header,
  &__message,
  &__message-form
    width: 75%
    margin: 0 auto



.room
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

.header
  @extend %flex
  width: 100%

  &__avatar
    @extend %avatar--sm
    margin-right: 0.5rem

  &__status
    margin-left: auto

.message

  &__list
    @extend %flex--column

  &__item
    margin-bottom: 2rem
    &:last-child
      margin-bottom: unset

    & .message__text
      border-radius: 1rem
      padding: 0.25rem 1rem

    &:nth-child(even)
      align-self: flex-end
      & .message__text
        background: $black
        color: $white
        border-bottom-right-radius: unset

    &:nth-child(odd)
      align-self: flex-start
      & .message__text
        background: $white
        color: $black
        border-bottom-left-radius: unset


.message-form
  margin-bottom: 2rem

  &__input
    width: 100%
    background: $pri-cl
    border-top: 1px solid $grey
    padding: 0.1rem 0
</style>
