<template lang='pug'>
div.conversation__header
  header.header
    ul
      li(
        v-for='(user, index) in members'
        :key='index'
      )
        div.header__avatar
          img(
            v-lazy='user.profilePicture'
            class='header__image'
          )
        p.header__text {{ user.displayName }}

    form.header__search-form
      input(
        v-model='search'
        class='search-form__input'
      )
      input(
        type='submit'
        class='search-form__input'
      )
    div.header__search-results
      ul.search-results
        li(
          v-for='(user, index) in users'
          :key='index'
          class='search-results__item'
          @click='addMember(user.uid)'
        )
          div(
            class='search-results__avatar'
          )
            img(
              v-lazy='user.profilePicture'
            )
          p {{ user.displayName }}
</template>


<script>
import { mapGetters } from 'vuex'

export default {
  data () {
    return {
      search: '',
      members: []
    }
  },
  computed: {
    users () {
      const users = this.getFriends
      console.log('users: ', users)
      return !this.search ? [] : users.filter(user => user.displayName.match(new RegExp(this.search, 'i')))
    },


    ...mapGetters({
      getFriends: 'friends/getFriends'
    }),


    ...mapGetters({
      members: 'messenger/getActiveConversationMembers'
    })
  },
  methods: {
    addMember (uid) {
      this.members.push(uid)
      console.log('members ---> ', this.members)
    }

  },
  created () {
    console.log('this: ', this.$route)
  }
}
</script>


<style lang='sass' scoped>

.header
  @extend %flex

  &__avatar
    @extend %avatar--sm
    margin-right: 0.5rem

.search-results

  &__avatar
    @extend %avatar--sm

</style>
