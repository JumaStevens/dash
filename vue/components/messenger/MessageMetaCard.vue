<template lang='pug'>
router-link(
  :to='{ name: "chatId", params: { id: item.id } }'
  class='card'
)
  User(
    :propData='user'
    class='card__user'
  )
  p.card__text {{ item.message }}
  //- p(
  //-   @click='deleteConversation'
  //- ).card__timestamp {{ item.timestamp | formatDate }}



</template>


<script>
import { mapGetters, mapActions } from 'vuex'
import User from '~comp/User.vue'

export default {
  components: {
    User
  },
  props: {
    item: {
      type: Object,
      required: true
    }
  },
  computed: {
    members () {

      const members = this.getMembers
      return members[this.item.id] || []
    },


    user () {
      return {
        timestamp: this.item.timestamp,
        user: {
          profilePicture: this.item.profilePicture,
          displayName: this.displayName
        }
      }
    },


    displayName () {
      const members = this.members
      const authUser = this.getCurrentUser
      const names = members.filter(member => member.uid !== authUser.uid).map(member => member.displayName).join(', ')
      return names
    },


    ...mapGetters({
      getUser: 'users/getUser',
      getMembers: 'messenger/members',
      getCurrentUser: 'auth/getCurrentUser'
    })
  },
  methods: {
    deleteConversation () {
      const id = this.item.id
      this.deleteConversations({ id })
    },


    ...mapActions({
      fetchUser: 'users/fetchUser',
      deleteConversations: 'messenger/deleteConversations'
    })
  },
  created () {
    // this.fetchUser(this.item.uid)
  }
}
</script>


<style lang='sass' scoped>

.card
  @extend %flex--column
  // height: $fs*4
  grid-gap: $unit/2 $unit
  background: $white
  padding: $unit $unit*2

  &__text
    padding: $unit/2 0
    color: $black
    overflow: hidden
    white-space: nowrap
    text-overflow: ellipsis
    margin-left: 56px

  &__timestamp
    grid-row: 1 / 2
    grid-column: 3 / 4
    font-size: 12px
    color: $dark
    @extend %flex--row-center

</style>
