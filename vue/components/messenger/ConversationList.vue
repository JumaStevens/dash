<template lang='pug'>
section.conversation-list

  //- list controller
  list-controller


  //- conversations
  ul(
    v-show='activeList === "messages"'
    class='list'
  )
    li(
      v-for='(item, index) in conversations'
      :key='"conversations" + index'
      class='list__item'
    )
      message-meta-card(
        :item='item'
        class='list__card'
      )


  //- pending
  ul(
    v-show='activeList === "pending"'
    class='list'
  )
    li(
      v-for='(item, index) in pending'
      :key='"conversations" + index'
      class='list__item'
    )
      message-meta-card(
        :item='item'
        class='list__card'
      )


  //- users / search
  ul(
    v-show='activeList === "users" || activeList === "search"'
    class='list'
  )
    li(
      v-for='(item, index) in users'
      :key='"users"+index'
      class='list__item'
    )
      add-user-card(
        :user='item'
        @addNewMember='addNewMember'
        @removeNewMember='removeNewMember'
        class='list__card'
      )

</template>


<script>
import ListController from '~comp/messenger/ListController.vue'
import MessageMetaCard from '~comp/messenger/MessageMetaCard.vue'
import AddUserCard from '~comp/messenger/AddUserCard.vue'
import { mapState, mapGetters, mapMutations, mapActions } from 'vuex'


export default {
  components: {
    ListController,
    MessageMetaCard,
    AddUserCard
  },
  data () {
    return {}
  },
  computed: {
    conversations () {
      const conversationsMeta = this.getMeta('conversations')
      return conversationsMeta.filter(meta => meta.displayName && meta.displayName.match(new RegExp(this.search, 'i')))
    },


    pending () {
      const pendingMeta = this.getMeta('pending')
      return pendingMeta.filter(meta => meta.displayName && meta.displayName.match(new RegExp(this.search, 'i')))
    },


    users () {
      const users = this.getFriends
      const friends = this.friends

      for (var key in friends) {
        if (friends.hasOwnProperty(key)) this.fetchUser(key)
      }

      return users.filter(user => user.displayName.match(new RegExp(this.search, 'i')))
    },


    ...mapGetters({
      getMeta: 'messenger/getMeta',
      getUsers: 'users/getUsers',
      getFriends: 'friends/getFriends',
      activeMembers: 'messenger/getActiveConversationMembers',
    }),


    ...mapState({
      friends: state => state.friends.friends,
      activeList: state => state.messenger.app.activeList,
      search: state => state.messenger.app.search
    })
  },
  methods: {
    cancelNewMembers () {
      const data = { value: 'messages' }
      this.$router.go(-1)
      this.clearNewMembers()
      this.setActiveList(data)
    },


    addNewMember (uid) { // queue member
      const data = { key: uid, value: true }
      this.setNewMember(data)
    },


    removeNewMember (uid) {
      const data = { key: uid, value: true }
      this.deleteNewMember(data)
    },


    setList (value) {
      const data = { value }
      this.setActiveList(data)

      const params = this.$route.params
      if (params.id && params.id !== 'new') this.activeMembers.forEach(member => this.writeMembers({ uid: member.uid }))
      console.log('route: ', this.activeMembers)
    },


    setNavigation (value) {
      this.navigation.active = value
      console.log('-...> ', this.navigation.active)
    },


    ...mapMutations({
      setNewMember: 'messenger/setNewMember',
      deleteNewMember: 'messenger/deleteNewMember',
      clearNewMembers: 'messenger/clearNewMembers',
      setActiveList: 'messenger/setActiveList'
    }),


    ...mapActions({
      fetchUser: 'users/fetchUser',
      writeMembers: 'messenger/writeMembers'
    })
  }
}
</script>


<style lang='sass' scoped>

.conversation-list
  @extend %flex--column
  background: $white

.list
  height: 100%
  overflow-y: auto

  &__item
    height: $fs*4

</style>
