<template lang='pug'>
a(
  @click='toggleMember(user.uid)'
  class='card'
)
  div(
    :class='{ active }'
    class='card__check'
  )
  div.card__avatar
    img(
      v-lazy='user.profilePicture'
      class='card__img'
    )
  p.card__name {{ user.displayName }}

</template>


<script>
import { mapState } from 'vuex'

export default {
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
  height: $fs*4
  display: grid
  grid-template-rows: repeat(2, auto)
  grid-template-columns: auto auto 1fr
  grid-gap: $unit/2 $unit
  background: $white
  padding: $unit $unit*2

  &__check
    grid-row: 1 / 3
    grid-column: 1 / 2
    width: calc(#{$fs} / 2 + 1px)
    height: calc(#{$fs} / 2 + 1px)
    align-self: center
    position: relative

    &::before,
    &::after
      content: ''
      position: absolute
      top: 0
      left: 0
      width: 100%
      height: 100%
      border-radius: 50%

    &::before
      border: 1px solid $dark

    &::after
      opacity: 0
      background: rgba(50, 132, 255, 1)

    &.active
      &::before
        opacity: 0

      &::after
        opacity: 1


  &__avatar
    @extend %avatar
    grid-row: 1 / 3
    grid-column: 2 / 3
    width: 48px
    height: 48px

  &__name
    grid-row: 1 / 2
    grid-column: 3 / 4
    font-weight: 900

  &__text
    grid-row: 2 / 3
    grid-column: 3 / 4
    color: $dark
    overflow: hidden
    white-space: nowrap
    text-overflow: ellipsis


</style>
