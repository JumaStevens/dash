<template lang='pug'>
//- message
div.message
  ul.message__list
    li(
      v-for='(message, index) in messages'
      :key='index'
      :class='[{ fromSelf: message.fromSelf }]'
      class='message__item'
    )
      div.message__media
        img.message__image
      p.message__text {{ message.message }}
      p.message__timestamp {{ message.timestamp | formatDate }}

</template>


<script>
import { mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters({
      messages: 'messenger/getConversationMessages'
    })
  }
}
</script>


<style lang='sass' scoped>
.message

  &__list
    @extend %flex--column

  &__item
    align-self: flex-start
    margin-bottom: 2rem
    &:last-child
      margin-bottom: unset

    & .message__text
      border-radius: 1rem
      padding: 0.25rem 1rem
      border-bottom-left-radius: unset
      background: $white
      color: $black

    &.fromSelf
      align-self: flex-end
      & .message__text
        border-bottom-right-radius: unset
        background: $black
        color: $white

</style>
