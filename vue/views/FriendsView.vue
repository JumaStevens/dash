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
        @click='addFriend("testfriend2")'
        class='users__item add-friend'
      )
        div(
          class='add-friend__icon'
        )
        a(
          class='add-friend__text'
        ) Add a friend

      li(
        v-for='(user, index) in users'
        :key='index'
        class='users__item'
      )
        p user# {{ index }}
        a(
          @click='addFriend(user.name)'
        ) add friend {{ user.name }}
</template>


<script>
import { mapActions } from 'vuex'

export default {
  data () {
    return {
      search: ''
    }
  },
  computed: {
    users () {
      return []
    }
  },
  methods: {
    showUsers () {
      console.log('show all users!')
    },


    addFriend (uid) {
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
    background: blue
    height: 200px


.add-friend
  @extend %flex--column
  justify-content: space-around
  align-items: center
  box-shadow: 0px 0px 0.5rem rgba(33, 33, 33, 0.2)
  border-radius: 0.75%
  overflow: hidden
  background: $pri-cl

  &__icon
    position: relative
    width: 50px
    height: 50px

    &::before,
    &::after
      content: ''
      position: absolute
      background: $black
      width: 100%
      height: 25%

    &::after
      transform: rotate(90deg)


</style>
