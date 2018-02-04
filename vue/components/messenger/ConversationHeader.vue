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


</template>


<script>
import { mapGetters } from 'vuex'

export default {
  data () {
    return {}
  },
  computed: {
    ...mapGetters({
      members: 'messenger/getActiveConversationMembers'
    })
  }
}
</script>


<style lang='sass' scoped>

.header
  @extend %flex

  &__avatar
    @extend %avatar--sm
    margin-right: 0.5rem

</style>
