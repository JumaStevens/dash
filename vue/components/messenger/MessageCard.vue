<template lang='pug'>
//- card
div.card

  div(
    v-if='!message.fromSelf'
    class='card__avatar'
  )

    img(
      v-lazy='user.profilePicture ? user.profilePicture : ""'
      class='card__img'
    )

  div(
    :class='{ "from-self": message.fromSelf }'
    class='card__content-container'
  )

    div.card__details

      p.card__name {{ message.fromSelf ? 'You' : user.displayName }}

      p.card__timestamp {{ message.timestamp | formatDate }}
      a(
        @click='deleteMessage'
        class='card__icon'
      )
        IconActions.card__svg

    p.card__text {{ message.message }}


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
      console.log('---> ', this.$store)
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
  grid-template-columns: 48px 1fr 48px
  grid-gap: 0 $unit*2
  min-height: 48px

  &__avatar
    @extend %avatar
    grid-column: 1 / 2

  &__content-container
    grid-column: 2 / 3
    @extend %flex--column

    &.from-self
      align-items: flex-end


  &__details
    position: relative

    &:hover

      & .card__timestamp
        visibility: hidden
        opacity: 0
        transition: opacity 1000ms, visibility 0 1000ms

      & .card__icon
        visibility: unset
        opacity: 1
        transition: opacity 1000ms, visibility 0

  &__name
    display: inline-block

  &__timestamp
    display: inline-block
    margin-left: $unit
    text-align: right
    color: $dark
    font-size: $fs-1
    transition: opacity 1000ms, visibility 0

  &__icon
    position: absolute
    top: 50%
    right: 0
    @extend %flex--row-center
    transform: translateY(-50%)
    transition: opacity 1000ms, visibility 0 1000ms
    visibility: hidden
    opacity: 0

  &__svg
    width: auto
    height: $fs
    fill: $dark

  &__text
    color: $dark



</style>
