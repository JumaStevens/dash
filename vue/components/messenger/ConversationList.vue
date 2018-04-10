<template lang='pug'>
section.conversation-list

  //- list controller
  list-controller(
    @confirmMemberQueue='confirmMemberQueue'
    @cancelMemberQueue='cancelMemberQueue'
    class='controller'
  )


  //- lists container
  div(class='lists-container')

    //- active users list
    div(class='active-users')
      h3(class='active-users__title') Active
      ul(
        class='active-users__list'
      )
        li(
          v-for='(item, index) in activeUsers'
          :key='"activeUsers" + index'
          class='active-users__item'
        )
          Avatar(
            :userData='item'
            class='active-users__avatar'
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
import Avatar from '~comp/Avatar.vue'
import { mapState, mapGetters, mapMutations, mapActions } from 'vuex'
import _ from 'lodash'


export default {
  components: {
    ListController,
    MessageMetaCard,
    AddUserCard,
    Avatar
  },
  data () {
    return {}
  },
  computed: {
    conversations () {
      const conversationsMeta = Object.values(this.getMeta)
      return conversationsMeta.filter(meta => meta.displayName && meta.displayName.match(new RegExp(this.search, 'i')))
    },


    users () {
      const users = this.getFriends
      const friends = this.friends

      _.forEach(friends, (value, key) => this.fetchUser(key))

      return users.filter(user => user.displayName.match(new RegExp(this.search, 'i')))
    },


    activeUsers () {
      console.log('activeUsers: ', this.onlineUsers)
      const users = Object.values(this.onlineUsers)
      const wrapUsers = users.map(user => {
        const obj = {}
        obj.user = user
        return obj
      })
      console.log('wrapUsers: ', wrapUsers)
      return wrapUsers
    },


    ...mapGetters({
      getMeta: 'messenger/getMeta',
      getUsers: 'users/getUsers',
      getFriends: 'friends/getFriends',
      activeMembers: 'messenger/getActiveConversationMembers',
      onlineUsers: 'presence/onlineUsers'
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

.lists-container
  height: 100%
  overflow-y: auto

.list

  &__item
    // box-shadow: 0px 4px 8px rgba(34,34,34,0.2)
    margin: 16px 0
    // border-bottom: 1px solid $grey
    // height: $fs*4


.active-users
  display: grid
  grid-template-rows: repeat(2, auto)
  grid-gap: $unit 0
  // height: $fs*4
  background: rgba(34, 150, 40, 0.1)
  padding: $unit $unit*2

  &__title
    grid-row: 1 / 2
    color: $black
    font-size: $fs

  &__list
    grid-row: 2 / 3
    display: grid
    grid-auto-flow: column
    grid-gap: 0 $unit*2
    overflow-x: auto
    overflow-y: hidden

  &__item
    width: 48px
    height: 48px

  &__avatar
    width: 48px
    height: 48px


</style>
