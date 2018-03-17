<template lang='pug'>
section.conversation-list

  //- list controller
  list-controller(
    @confirmMemberQueue='confirmMemberQueue'
    @cancelMemberQueue='cancelMemberQueue'
    class='controller'
  )


  //- conversations list
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


  //- pending list
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


  //- users / search list
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
import _ from 'lodash'


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

      _.forEach(friends, (value, key) => this.fetchUser(key))

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
      search: state => state.messenger.app.search,
      memberQueue: state => state.messenger.app.newMembers
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


    cancelMemberQueue () {
      _.forEach(this.memberQueue, (value, key) => this.deleteNewMember({ key }))
    },


    confirmMemberQueue () {
      _.forEach(this.memberQueue, (value, key) => this.writeMembers({ uid: key }) )
    },


    ...mapMutations({
      setNewMember: 'messenger/setNewMember',
      deleteNewMember: 'messenger/deleteNewMember',
      clearNewMembers: 'messenger/clearNewMembers',
      setActiveList: 'messenger/SET_ACTIVE_LIST'
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
