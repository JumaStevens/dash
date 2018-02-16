<template lang='pug'>
header(class='header')

  //- logo
  div.header__logo
    icon-messenger.header__logo-svg
    h2.header__logo-text Messenger

  //- //- active conversation members
  //- ul.header__members
  //-   li(
  //-     v-for='(user, index) in activeMembers'
  //-     :key='index'
  //-   )
  //-     div.header__avatar
  //-       img(
  //-         v-lazy='user.profilePicture'
  //-         class='header__image'
  //-       )
  //-     p.header__text {{ user.displayName }}


</template>


<script>
import IconMessenger from '~/assets/svg/logo-messenger.svg'
import { mapGetters, mapMutations, mapState } from 'vuex'

export default {
  components: {
    IconMessenger
  },
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
  grid-template-columns: repeat(3, 1fr)
  height: $fs*4
  align-items: center
  padding: 0 $unit*2
  margin-bottom: 2px
  background: $white

  &__members
    grid-row: 2 / 3
    grid-column: 2 / 3
    background: pink
    height: 100%

  &__avatar
    @extend %avatar--sm
    margin-right: 0.5rem

  &__logo
    display: flex
    grid-column: 1 / 2

  &__logo-svg
    height: $fs*1.5
    margin-right: $unit

  &__logo-text
    color: $black
    font-size: $fs
    font-weight: 900

</style>
