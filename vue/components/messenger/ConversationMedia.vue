<template lang='pug'>
section(class='members')

  //- active conversation members
  ul.members__list
    li(
      v-for='(user, index) in members'
      :key='index'
      class='members__item'
    )
      div.members__avatar
        img(
          v-lazy='user.profilePicture'
          class='members__img'
        )
      p.members__name {{ user.displayName }}

</template>


<script>
import { mapGetters, mapMutations, mapState } from 'vuex'

export default {
  computed: {
    ...mapGetters({
      members: 'messenger/getActiveConversationMembers',
    })
  }
}
</script>


<style lang='sass' scoped>

.members
  @extend %flex--column
  justify-content: center
  align-items: center
  background: white
  display: none

  &__list
    display: none

  &__item
    @extend %flex--column
    align-items: center

  &__avatar
    @extend %avatar

  &__name

</style>
