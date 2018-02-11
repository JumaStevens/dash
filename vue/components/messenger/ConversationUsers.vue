<template lang='pug'>
section.container
  //- search form
  form.header__search-form
    input(
      v-model='search'
      class='search-form__input'
    )
    input(
      type='submit'
      class='search-form__input'
    )

  //- search results
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
      search: ''
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
      getFriends: 'friends/getFriends'
    })
  },
  methods: {
    addMember (uid) {
      this.$emit('addMember', uid)
    }
  }
}
</script>


<style lang='sass' scoped>



.search-results

  &__avatar
    @extend %avatar--sm


</style>
