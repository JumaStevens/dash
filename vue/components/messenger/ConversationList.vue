<template lang='pug'>
section.conversation-list

  //- controller
  aside.controller

    //- search icon
    a(
      v-show='!isUserListActive'
      class='controller__icon'
    )
      icon-search.controller__svg

    //- check mark icon
    a(
      v-show='isUserListActive'
      @click='setList("conversations")'
      class='controller__icon'
    )
      icon-check.controller__svg

    //- search form
    form(
      class='controller__search-form search-form'
    )
      input(
        v-model='search'
        placeholder='Search messenger...'
        class='search-form__input'
      )

    //- new message icon
    router-link(
      :to='{ name: "chat", params: { id: "new" } }'
      v-show='!isUserListActive'
      @click.native='setList("users")'
      class='controller__icon controller__icon--right'
    )
      icon-new-message.controller__svg

    //- cancel icon
    a(
      v-show='isUserListActive'
      class='controller__icon controller__icon--right'
      @click='cancelNewMembers'
    )
      icon-cancel.controller__svg


  //- conversation list
  ul(
    v-show='!isUserListActive'
    class='list'
  )

    //- conversations
    li(
      v-for='(item, index) in conversations'
      :key='"conversations"+index'
      class='list__item'
    )
      message-meta-card(
        :item='item'
        class='list__card'
      )


  //- friends list
  ul(
    v-show='isUserListActive'
    class='list'
  )

    //- users
    li(
      v-for='(item, index) in users'
      :key='"users"+index'
      class='list__item'
    )
      add-user-card(
        :user='item'
        class='list__card'
        @addNewMember='addNewMember'
        @removeNewMember='removeNewMember'
      )

</template>


<script>
import IconSearch from '~/assets/svg/icon-search.svg'
import IconNewMessage from '~/assets/svg/icon-new-message.svg'
import IconCheck from '~/assets/svg/icon-check-mark.svg'
import IconCancel from '~/assets/svg/icon-cancel.svg'
import MessageMetaCard from '~comp/messenger/MessageMetaCard.vue'
import AddUserCard from '~comp/messenger/AddUserCard.vue'
import { mapState, mapGetters, mapMutations, mapActions } from 'vuex'

export default {
  components: {
    IconSearch,
    IconNewMessage,
    IconCheck,
    IconCancel,
    MessageMetaCard,
    AddUserCard
  },
  data () {
    return {
      search: '',
    }
  },
  computed: {
    conversations () {
      const meta = this.getConversationMeta
      const users = this.getUsers
      if (!this.search) return meta

      const newMeta = meta.map(m => users.find(user => user.uid === m.uid))
      const combinedMeta = meta.map((m, i) => {
        return { ...m, ...newMeta[i] }
      })

      return combinedMeta.filter(meta => meta.displayName && meta.displayName.match(new RegExp(this.search, 'i')))
    },


    users () {
      const users = this.getFriends
      const friends = this.friends

      for (var key in friends) {
        if (friends.hasOwnProperty(key)) this.fetchUser(key)
      }

      return users.filter(user => user.displayName.match(new RegExp(this.search, 'i')))
    },


    isUserListActive () {
      return this.activeList === 'users'
    },


    ...mapGetters({
      getConversationMeta: 'messenger/getConversationMeta',
      getUsers: 'users/getUsers',
      getFriends: 'friends/getFriends'
    }),


    ...mapState({
      friends: state => state.friends.friends,
      activeList: state => state.messenger.app.activeList
    })
  },
  methods: {
    cancelNewMembers () {
      const data = { value: 'conversations' }
      this.$router.go(-1)
      this.clearNewMembers()
      this.setActiveList(data)
    },


    addNewMember (uid) {
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
    },


    ...mapMutations({
      setNewMember: 'messenger/setNewMember',
      deleteNewMember: 'messenger/deleteNewMember',
      clearNewMembers: 'messenger/clearNewMembers',
      setActiveList: 'messenger/setActiveList'
    }),


    ...mapActions({
      fetchUser: 'users/fetchUser'
    })
  }
}
</script>


<style lang='sass' scoped>

.conversation-list
  @extend %flex--column


.controller
  display: grid
  grid-template-columns: 48px 1fr 48px
  grid-gap: 0px $unit
  align-items: stretch
  height: $fs*4
  margin-bottom: 1px
  background: $white

  &__icon
    grid-column: 1 / 2
    @extend %flex
    align-items: center
    padding-left: $unit*2

    &--right
      grid-column: 3 / 4
      justify-content: flex-end
      padding: 0 $unit*2 0 0

  &__svg
    width: auto
    height: $fs
    fill: $dark


.search-form
  grid-column: 2 / 3
  @extend %flex
  margin: 0 $unit*2

  &__input
    width: 100%
    background: transparent
    color: $dark

    &::placeholder
      color: $dark


.list
  height: 100%
  overflow-y: auto

  &__item
    height: $fs*4

</style>
