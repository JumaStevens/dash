<template lang='pug'>
router-link(
  :to='{ name: "chatId", params: { id: item.id } }'
  class='card'
)
  div.card__avatar
    img(
      v-lazy='user.profilePicture ? user.profilePicture : ""'
      class='card__img'
    )
  p.card__name {{ displayName }}
  p.card__text {{ item.message }}
  p.card__timestamp {{ item.timestamp | formatDate }}

</template>


<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  props: {
    item: {
      type: Object,
      required: true
    }
  },
  computed: {
    user () {
      // console.log('users: ', this.getUser(this.item.uid))
      return this.getUser(this.item.uid) || {}
    },


    members () {
      return this.getMembers(this.item.id)
    },


    displayName () {
      const members = this.members
      const authUser = this.getCurrentUser
      const names = members.filter(member => member.uid !== authUser.uid).map(member => member.displayName).join(', ')
      return names
    },


    ...mapGetters({
      getUser: 'users/getUser',
      getMembers: 'messenger/getMembers',
      getCurrentUser: 'auth/getCurrentUser'
    })
  },
  methods: {
    ...mapActions({
      fetchUser: 'users/fetchUser'
    })
  },
  created () {
    // this.fetchUser(this.item.uid)
  }
}
</script>


<style lang='sass' scoped>

.card
  height: $fs*4
  display: grid
  grid-template-rows: repeat(2, auto)
  grid-template-columns: auto 1fr auto
  grid-gap: $unit/2 $unit
  background: $white
  padding: $unit $unit*2

  &__avatar
    @extend %avatar
    grid-row: 1 / 3
    grid-column: 1 / 2
    width: 48px
    height: 48px

  &__name
    grid-row: 1 / 2
    grid-column: 2 / 3
    font-weight: 900
    white-space: nowrap
    text-overflow: ellipsis
    overflow: hidden

  &__text
    grid-row: 2 / 3
    grid-column: 2 / 3
    color: $dark
    overflow: hidden
    white-space: nowrap
    text-overflow: ellipsis

  &__timestamp
    grid-row: 1 / 2
    grid-column: 3 / 4
    font-size: 12px
    color: $dark
    @extend %flex--row-center

</style>
