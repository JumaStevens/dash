<template lang='pug'>
div.card

  //- user meta
  User(
    :propData='message'
    class='card__user'
  )

  //- message
  div.card__message
    p.card__text {{ message.message }}
    a(
      v-if='message.fromSelf'
      @click='handleDeleteMessage'
      class='card__icon'
    )
      IconActions.card__svg

</template>


<script>
import { mapGetters, mapActions } from 'vuex'
import IconActions from '~/assets/svg/icon-actions.svg'
import User from '~comp/User.vue'


export default {
  components: {
    IconActions,
    User
  },
  props: {
    message: {
      type: Object,
      required: true
    }
  },
  methods: {
    handleDeleteMessage () {
      this.$emit('deleteMessage', this.message)
    }
  }
}
</script>


<style lang='sass' scoped>
.card
  @extend %flex--column

  &:hover
    & .card__text
      background: rgba(34, 150, 40, 0.1)

    & .card__icon
      opacity: 1
      visibility: unset
      transition: opacity 250ms, visibility 0ms

  &__message
    position: relative
    margin-left: $unit*7 - $unit/2

  &__text
    padding: $unit/2
    border-radius: 4px
    color: $black

  &__icon
    @extend %flex--row-center
    position: absolute
    top: 50%
    left: calc(100% + #{$unit})
    transform: translateY(-50%)
    opacity: 0
    visibility: hidden
    transition: opacity 250ms, visibility 0ms 250ms

  &__svg
    width: auto
    height: $fs
    fill: $dark

</style>
