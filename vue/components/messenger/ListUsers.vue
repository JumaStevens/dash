<template lang='pug'>
section(
  v-show='routeId === "new"'
  class='conversation-list'
)


  //- header
  header(class='controller header')
    //- back
    a(
      @click='cancelNewMembers'
      class='header__icon header__back'
    )
      IconChevron(class='header__svg')

    //- next
    a(
      @click='confirmMemberQueue'
      :class='{ active: !isMemberQueueEmpty }'
      class='header__icon header__next'
    ) Next


  //- lists container
  div(class='lists-container')

    //- search
    Search(class='search')

    //- users / search list
    div(class='users')
      h3(class='active-users__title list__title') Suggested
      ul(class='list')
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
import Search from '~comp/Search.vue'
import { mapState, mapGetters, mapMutations, mapActions } from 'vuex'
import _ from 'lodash'
import IconChevron from '~/assets/svg/icon-chevron.svg'


export default {
  components: {
    ListController,
    MessageMetaCard,
    AddUserCard,
    Header,
    Avatar,
    IconChevron,
    Search
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
      memberQueue: state => state.messenger.app.newMembers,
      routeId: state => state.route.params.id
    })
  },
  methods: {
    cancelNewMembers () {
      const routeId = this.$route.params.id
      if (routeId === 'new') {
        this.$router.push({ name: 'chat' })
      } else {
        const data = { value: 'messages' }
        this.$router.go(-1)
        this.setActiveList(data)
      }
      this.clearNewMembers()
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
  position: relative
  z-index: 50
  display: grid
  grid-gap: $unit*2 0
  align-items: center
  grid-template-columns: auto 1fr auto
  box-shadow: 0px 4px 24px rgba(34, 34, 34, 0.03)

  &__icon
    min-width: $unit*6
    height: $unit*6
    padding: $unit*2

  &__svg
    width: auto
    height: $fs
    fill: rgba(110, 188, 228, 1)

  &__back
    grid-row: 1 / 2
    grid-column: 1 / 2

  &__next
    grid-row: 1 / 2
    grid-column: 3 / 4
    color: $grey

    &.active
      color: rgba(110, 188, 228, 1)

  &__back
    transform: rotate(-90deg)



.lists-container
  height: calc(100vh - (48px + 48px))
  overflow-y: auto
  padding: 0 $unit*2

.search
  margin: $unit*5 0
  
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
