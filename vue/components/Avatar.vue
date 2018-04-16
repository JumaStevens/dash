<template lang='pug'>
router-link(
  to='/account'
  class='avatar'
)
  img(
    v-if='userData.user.profilePicture'
    v-lazy='userData.user.profilePicture'
    class='avatar__img'
  )
  span(
    v-else
    class='avatar__text'
  ) {{ initial }}
</template>


<script>
import { mapGetters } from 'vuex'

export default {
  props: {
    userData: {
      type: Object,
      required: true
    }
  },
  data () {
    return {}
  },
  computed: {
    initial () {
      const displayName = this.userData.user.displayName
      return displayName ? displayName[0] : '?'
    },


    ...mapGetters({
      getCurrentUserProfilePicture: 'auth/getCurrentUserProfilePicture'
    })
  }
}
</script>


<style lang='sass' scoped>

.avatar
  width: 100%
  height: 100%

  &__text
    @extend %flex--row-center
    height: 100%
    border-radius: 50%
    border: 1px solid $grey

  &__img
    width: inherit
    height: inherit
    border-radius: 50%
    object-fit: cover

</style>
