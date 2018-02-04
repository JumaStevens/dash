<template lang='pug'>
main.container
  .friends
    //- search form
    form(
      @submit.prevent=''
      class='friends__search search'
    )
      input(
        v-model='search'
        class='search__input'
      )
      input(
        type='submit'
        class='search__submit'
      )

    //- users list
    ul(
      class='friends__users users'
    )
      li(
        @click='toggleShowFriends'
        class='users__item add-friend'
      )
        div(
          :class='[{ toggle: !showFriends }]'
          class='add-friend__icon'
        )
        a(
          class='add-friend__text'
        ) {{ addFriendText }}

      li(
        v-for='(user, index) in users'
        :key='index'
        class='users__item'
      )
        div.users__avatar
          img(
            v-lazy='user.profilePicture'
            class='users__img'
          )
        p(
          class='users__text'
        ) {{ user.displayName }}
        a(
          @click='addFriend(user.uid)'
          class='users__button'
        ) + add friend
        a(
          @click='deleteFriend(user.uid)'
          class='users__button'
        ) - remove friend
</template>


<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  data () {
    return {
      search: '',
      showFriends: true,
    }
  },
  computed: {
    users () {
      console.log('friends: ', this.getFriends)
      console.log('users: ', this.getUsers)
      return this.showFriends ? this.getFriends : this.getUsers
    },


    addFriendText () {
      return this.showFriends ? 'add a friend' : 'show my friends'
    },


    ...mapGetters({
      getFriends: 'friends/getFriends',
      getUsers: 'users/getUsers'
    })
  },
  methods: {
    toggleShowFriends () {
      this.showFriends = !this.showFriends
      console.log('show friends ', this.showFriends)
    },


    addFriend (uid) {
      console.log('uid: ', uid)
      this.$store.dispatch('friends/addFriend', uid)
    },


    deleteFriend (uid) {
      this.$store.dispatch('friends/deleteFriend', uid)
    },


    ...mapActions({
      initUsers: 'users/initUsers',
      initFriends: 'friends/initFriends'
    })
  },
  created () {
    this.initUsers()
    this.initFriends()
  }
}
</script>


<style lang='sass' scoped>

.container
  box-shadow: 0px 0px 0.5rem rgba(33, 33, 33, 0.2)
  border-radius: 0.75%
  overflow: hidden
  background: $pri-cl

.friends
  @extend %flex--column
  height: 100%

  &__search
    flex: 1

  &__users
    flex: 10

.search
  display: flex
  justify-content: center

  &__input
    width: 75%



.users
  display: grid
  grid-template-columns: repeat(4, 1fr)
  grid-auto-rows: min-content
  grid-gap: $unit*2
  margin: $unit*2

  &__item
    height: 200px
    box-shadow: 0px 0px 0.5rem rgba(33, 33, 33, 0.2)
    border-radius: 0.75%
    overflow: hidden
    background: $pri-cl
    @extend %flex--column
    align-items: center

  &__avatar
    @extend %avatar--l
    margin-top: $unit * 2

  &__text
    font-size: $fs-1
    text-transform: uppercase
    margin: $unit 0 $unit * 2 0

  &__button
    font-size: $fs-1
    text-transform: uppercase
    margin: auto 0 $unit * 3 0



.add-friend
  @extend %flex--column
  justify-content: space-around
  align-items: center
  box-shadow: 0px 0px 0.5rem rgba(33, 33, 33, 0.2)
  border-radius: 0.75%
  overflow: hidden
  background: $white

  &__icon
    position: relative
    width: 50px
    height: 50px
    transition: transform 150ms

    &.toggle
      transform: rotate(45deg)

    &::before,
    &::after
      content: ''
      position: absolute
      top: 50%
      left: 50%
      width: 100%
      height: 25%
      transform: translate(-50%, -50%)
      background: $black

    &::after
      transform: translate(-50%, -50%) rotate(90deg)

  &__text
    font-size: $fs-1


</style>
