<template lang='pug'>
section(
  v-show='activeList === "users" || activeList === "search"'
  class='conversation-list'
)

  //- list controller
  Header(
    @confirmMemberQueue='confirmMemberQueue'
    @cancelMemberQueue='cancelMemberQueue'
    class='controller'
  )


  //- lists container
  div(class='lists-container')

    //- users / search list
    div(class='users')

      ul(
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
import Header from '~comp/messenger/Header.vue'
import Avatar from '~comp/Avatar.vue'
import { mapState, mapGetters, mapMutations, mapActions } from 'vuex'
import _ from 'lodash'


export default {
  components: {
    ListController,
    MessageMetaCard,
    AddUserCard,
    Header,
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

      return users //.filter(user => user.displayName.match(new RegExp(this.search, 'i')))
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


    isMemberQueueEmpty () {
      // console.log('memberQueue: ', this.memberQueue)
      return _.isEmpty(this.memberQueue)
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
  background: $white
  +mq-l
    min-width: 400px


.header


.lists-container
  height: calc(100vh - (48px + 48px))
  overflow-y: auto
  padding: 0 $unit*2
  background: $grey


.list
  padding: $unit*3 0 $unit*6 0


  &__item
    margin: $unit*3 0

    &:first-child
      margin-top: 0

    &:last-child
      margin-bottom: 0

  &__title
    // margin-bottom: 24px
    font-size: 12px
    color: $dark
    text-transform: uppercase


.active-users
  // margin: 0px 0 $unit*6 0


  &__title


  &__list
    display: grid
    grid-auto-flow: column
    grid-gap: 0 $unit*2
    padding: $unit*3 0 $unit*7 0

  &__item
    width: 48px
    height: 48px

  &__avatar
    width: 48px
    height: 48px

</style>
