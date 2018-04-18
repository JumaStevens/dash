<template lang='pug'>
a(
  @click='toggleMember(user.uid)'
  :class='{ active }'
  class='card'
)
  User(
    :propData='userData'
    class='card__user'
  )
  span(
    :class='{ active: !active }'
    class='card__check'
  ) +
  span(
    :class='{ active }'
    class='card__check'
  ) -

</template>


<script>
import { mapState } from 'vuex'
import User from '~comp/User.vue'

export default {
  components: {
    User
  },
  props: {
    user: {
      type: Object,
      required: true
    }
  },
  computed: {
    active () {
      return this.newMembers[this.user.uid]
    },


    userData () {
      return {
        timestamp: '',
        user: {
          profilePicture: this.user.profilePicture,
          displayName: this.user.displayName
        }
      }
    },


    ...mapState({
      newMembers: state => state.messenger.app.newMembers
    })
  },
  methods: {
    toggleMember (uid) {
      this.active ? this.$emit('removeNewMember', uid) : this.$emit('addNewMember', uid)
    }
  }
}
</script>


<style lang='sass' scoped>

.card
  display: grid
  grid-template-rows: 1fr
  grid-template-columns: 1fr auto
  grid-gap: $unit/2 $unit
  align-items: center
  padding: $unit*2 $unit*3
  border-radius: $unit/2
  background: $white
  box-shadow: 0px 4px 24px rgba(34, 34, 34, 0.05)
  transition: box-shadow 250ms, background 500ms

  // TO DO: transitioning box-shadow, background is a performance issue

  &.active
    background: rgba(243, 198, 218, 1)
    box-shadow: 0px 4px 24px rgba(243, 198, 218, 1)

  &__user
    grid-row: 1 / 2
    grid-column: 1 / 2

  &__check
    @extend %flex--row-center
    grid-row: 1 / 2
    grid-column: 2 / 3
    width: $unit*6
    height: $unit*6
    opacity: 0

    &.active
      opacity: 1

</style>
