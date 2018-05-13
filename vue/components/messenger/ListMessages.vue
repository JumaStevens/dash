<template lang='pug'>
section(
  v-show='!routeId'
  class='inbox'
)


  //- header
  header(
    class='inbox__header header'
  )

    //- edit
    a(
      @click=''
      class='header__icon header__edit'
    ) Edit

    //- new message
    router-link(
      @click.native='setList("users")'
      :to='{ name: "chatId", params: { id: "new" } }'
      class='header__icon header__new-message'
    )
      IconPlus(class='header__svg header__svg--primary')


  //- view
  div(class='inbox__view')

    //- users
    div(
      class='active-users'
    )
      h3(class='active-users__title list__title') Online
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

    //- conversations
    div(
      class='conversations'
    )
      h3(class='list__title') Conversations
      ul(class='list')
        li(
          v-for='(item, index) in conversations'
          :key='"conversations" + index'
          class='list__item'
        )
          message-meta-card(
            :item='item'
            class='list__card'
          )


</template>


<script>
import MessageMetaCard from '~comp/messenger/MessageMetaCard.vue'
import Header from '~comp/messenger/Header.vue'
import Avatar from '~comp/Avatar.vue'
import IconPlus from '~/assets/svg/icon-plus.svg'
import Search from '~comp/Search.vue'
import { mapState, mapGetters, mapMutations, mapActions } from 'vuex'
import _ from 'lodash'


export default {
  components: {
    MessageMetaCard,
    Header,
    Avatar,
    IconPlus,
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
      routeId: state => state.route.params.id
    })
  },
  methods: {
    setList (value) {
      if (!value) return
      this.setActiveList(value)
    },

    ...mapMutations({
      setActiveList: 'messenger/SET_ACTIVE_LIST'
    }),


    ...mapActions({
      fetchUser: 'users/fetchUser'
    })
  }
}
</script>


<style lang='sass' scoped>

.inbox
  background: $white
  +mq-l
    min-width: 400px


.inbox__header

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
    fill: $dark

    &--primary
      fill: rgba(110, 188, 228, 1)

  &__edit,
  &__back
    grid-row: 1 / 2
    grid-column: 1 / 2

  &__new-message
    grid-row: 1 / 2
    grid-column: 3 / 4

  &__edit

  &__back
    transform: rotate(-90deg)


.inbox__view
  height: calc(100vh - (48px + 48px))
  overflow-y: auto
  padding: 0 $unit*2
  overflow-y: scroll
  -webkit-overflow-scrolling: touch


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
