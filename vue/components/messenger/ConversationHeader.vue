<template lang='pug'>
div.container
  header.header

    //- close
    div.header__close
      p(
        @click='close'
      ) Close

    //- active conversation members
    ul.header__members
      li(
        v-for='(user, index) in activeMembers'
        :key='index'
      )
        div.header__avatar
          img(
            v-lazy='user.profilePicture'
            class='header__image'
          )
        p.header__text {{ user.displayName }}


</template>


<script>
import { mapGetters, mapMutations, mapState } from 'vuex'

export default {
  data () {
    return {

    }
  },
  computed: {
    users () {
      const users = this.getFriends
      console.log('users: ', users)
      if (users) return users
      return !this.search ? [] : users.filter(user => user.displayName.match(new RegExp(this.search, 'i')))
    },

    ...mapGetters({
      getFriends: 'friends/getFriends',
      activeMembers: 'messenger/getActiveConversationMembers'
    })
  },
  methods: {
    close () {
      this.$router.go(-1)
    }
  },
  created () {
    console.log('this: ', this.$route)
  }
}
</script>


<style lang='sass' scoped>

.header
  display: grid
  grid-template-rows: repeat(3, auto)
  grid-template-columns: 1fr auto 1fr


  &__close
    grid-row: 1 / 2
    grid-column: 1 / 2


  &__members
    grid-row: 2 / 3
    grid-column: 2 / 3
    background: pink
    height: 100%


  &__avatar
    @extend %avatar--sm
    margin-right: 0.5rem


</style>
