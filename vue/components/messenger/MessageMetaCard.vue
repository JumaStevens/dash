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
  display: block
  padding: $unit*2
  border-radius: $unit/2
  background: $white
  box-shadow: 0px 4px 24px rgba(34, 34, 34, 0.05)

  &__user


  &__text
    margin: $unit 0 0 48px
    overflow: hidden
    white-space: nowrap
    text-overflow: ellipsis
    color: $black


  &__timestamp
    @extend %flex--row-center
    font-size: 12px
    color: $dark

</style>
