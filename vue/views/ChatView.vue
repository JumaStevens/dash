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

  // message
  div.chat__message
    div.message

      header.message__header
        div.message__avatar
          img(
            v-lazy='chatRoom[0].avatarSrc'
          ).message__image
        p.message__text {{ chatRoom[0].fullName }}
        p.message__status Active

      ul.message__list
        li(
          v-for='(item, index) in chatRoom'
          :key='index'
        ).message__item
          p.message__text {{ item.text }}
      div
        p {{ inputMessage }}

  // message form
  div.chat__message-form
    form.message-form(
      @submit.prevent='sendMessage'
    )
      input.message-form__input(
        v-model='inputMessage'
        placeholder='Type a message...'
      )
</template>


<script>
import chatData from '../data/chat.json'

export default {
  data () {
    return {
      chatRoom: [],
      inputMessage: ''
    }
  },
  methods: {
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
  beforeMount () {
    this.setChatRoom()
  },
  created () {
    this.joinRoom()
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
  grid-template-rows: 1fr auto
  grid-template-columns: repeat(2, auto)
  box-shadow: 0px 0px 0.5rem rgba(33, 33, 33, 0.2)
  border-radius: 0.75%
  overflow: hidden

  &__room
    background: $white
    grid-row: 1 / 3
    grid-column: 1 / 2
    @extend %flex--column
    align-items: center

  &__message
    grid-row: 1 / 2
    grid-column: 2 / 3
    width: 75%
    margin: 0 auto

  &__message-form
    grid-row: 2 / 3
    grid-column: 2 / 3
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


.message

  &__header
    @extend %flex
    align-items: center
    margin: 2rem 0

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


  &__avatar
    @extend %avatar--sm
    margin-right: 0.5rem

  &__status
    margin-left: auto


.message-form
  margin-bottom: 2rem

  &__input
    width: 100%
    background: $pri-cl
    border-top: 1px solid $grey
    padding: 0.1rem 0
</style>
