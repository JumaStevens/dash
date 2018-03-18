<template lang='pug'>
//- card
div.card

  //- avatar
  div(
    class='card__avatar'
  )
    img(
      v-lazy='user && user.profilePicture ? user.profilePicture : ""'
      class='card__img'
    )

  //- details
  p.card__details
    span.card__name {{ user.displayName }}
    span.card__timestamp &nbsp; {{ message.timestamp | formatDate }}

  //- text
  p.card__text {{ message.message }}

  //- actions
  a(
    @click='deleteMessage'
    class='card__icon'
  )
    IconActions.card__svg


</template>


<script>
import { mapGetters, mapActions } from 'vuex'
import IconActions from '~/assets/svg/icon-actions.svg'

export default {
  components: {
    IconActions
  },
  props: {
    message: {
      type: Object,
      required: true
    }
  },
  computed: {
    user () {
      const uid = this.message.uid
      const user = this.members.find(member => member.uid === uid)
      return user
    },


    ...mapGetters({
      members: 'messenger/getActiveConversationMembers'
    })
  },
  methods: {
    deleteMessage () {
      const data = {
        convoId: this.$route.params.id,
        messageId: this.message.id
      }
      this.deleteMessages(data)
    },


    ...mapActions({
      deleteMessages: 'messenger/deleteMessages'
    })
  }
}
</script>


<style lang='sass' scoped>
.card
  display: grid
  grid-template-rows: repeat(2, auto)
  grid-template-columns: 48px 1fr auto 48px
  grid-gap: $unit/2 $unit
  min-height: 48px

  &:hover

    & .card__text
      background: rgba(34, 150, 40, 0.1)

    & .card__icon
      visibility: unset
      opacity: 1
      transition: opacity 250ms, visibility 0ms

  &__avatar
    @extend %avatar
    grid-row: 1 / -1
    grid-column: 1 / 2

  &__details


  &__name


  &__timestamp
    color: $dark
    font-size: 12px
    text-transform: uppercase


  &__icon
    @extend %flex--row-center
    grid-row: 1 / 2
    grid-column: 3 / 4
    visibility: hidden
    opacity: 0
    transition: opacity 250ms, visibility 0ms 250ms

  &__svg
    width: auto
    height: $fs
    fill: $dark

  &__text
    grid-row: 2 / 3
    grid-column: 2 / 4
    color: $dark

</style>
