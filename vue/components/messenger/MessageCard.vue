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

  div.card__content-container

    p(
      :class='{ "from-self": message.fromSelf }'
      class='card__name'
    ) {{ message.fromSelf ? 'You' : user.displayName }}

      span.card__timestamp &nbsp;at {{ message.timestamp | formatDate }}

    p(
      :class='{ "from-self": message.fromSelf }'
      class='card__text'
    ) {{ message.message }}



</template>


<script>
import { mapGetters, mapActions } from 'vuex'

export default {
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

  &__name

    &.from-self
      text-align: right

  &__text
    color: $dark

    &.from-self
      text-align: right

  &__timestamp
    color: $dark
    font-size: $fs-1





</style>
