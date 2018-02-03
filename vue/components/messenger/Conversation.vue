<template lang='pug'>
div.conversation
  //- header
  div.conversation__header
    header.header
      div.header__avatar
        img().header__image
      p.header__text name dawg

  //- message
  div.conversation__message
    div.message
      ul.message__list
        li(
          v-for='(item, index) in messages'
          :key='index'
          class='message__item'
        )
          p(
            @click='deleteMessage(item)'
            class='message__text'
          ) {{ item.message }}
          p {{ item.timestamp | formatDate }}

  //- message form
  div.conversation__message-form
    form(
      @submit.prevent='addMessage'
      class='message-form'
    )
      input(
        v-model='newMessage'
        placeholder='Type a message...'
        class='message-form__input'
      )

</template>


<script>


export default {
  data () {
    return {
      messages: [],
      newMessage: ''
    }
  }
}
</script>


<style lang='sass' scoped>

.conversation
  @extend %flex--column
  align-items: center

  &__header,
  &__message,
  &__message-form
    width: 75%

  &__header
    @extend %flex
    flex: 1
    align-items: center

  &__message
    flex: 3
    overflow-y: auto

  &__message-form
    flex: 1

.header
  @extend %flex

  &__avatar
    @extend %avatar--sm
    margin-right: 0.5rem

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
