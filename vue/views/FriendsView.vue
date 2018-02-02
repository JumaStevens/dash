<template lang='pug'>
main.container
  // search form
  form.search
    input(

    )
    input(
      type='submit'
    )

  // friends list
  ul.friends {{ friends }}
    li
      a(
        @click='addFriend'
      ) add friend
    li(
      v-for='(friend, index) in friends'
      :key='index'
    )
      p friend# {{ index }}

  // users list
  ul.users {{ users }}
    li(
      v-for='(user, index) in users'
      :key='index'
    )
      p user# {{ index }}
      a(
        @click='addFriend(user.name)'
      ) add friend {{ user.name }}
</template>


<script>
import firebase from '~/firebase'
import { friendsRef } from '~/firebase/friends'
import { usersRef } from '~/firebase/users'
import moment from 'moment'

export default {
  data () {
    return {}
  },
  methods: {
    addFriend (uid) {
      const data = {}
      data[uid] = true
      console.log('uid: ', uid)
      this.$firebaseRefs.friends.child(this.currentUser.uid).set(data)
    },
    deleteFriend (item) {
      this.$firebaseRefs.friends.child(item['.key']).remove()
    }
  },
  computed: {
    currentUser () {
      const user = this.$store.getters['auth/getCurrentUser']
      console.log('currentUser: ---> ', user)
      return user
    }
  },
  firebase: {
    friends: {
      source: friendsRef,
      cancelCallback (e) {
        console.log('canceled! ', e)
      },
      readyCallback (e) {
        console.log('readyCallback! ', e)
      }
    },
    users: {
      source: usersRef,
      cancelCallback (e) {
        console.log('canceled! ', e)
      },
      readyCallback (e) {
        console.log('readyCallback! ', e)
      }
    }
  }
}
</script>


<style lang='sass' scoped>

.container
  display: grid
  box-shadow: 0px 0px 0.5rem rgba(33, 33, 33, 0.2)
  border-radius: 0.75%
  overflow: hidden
  background: $pri-cl


</style>
