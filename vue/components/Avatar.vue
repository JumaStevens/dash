<template lang='pug'>
router-link(
  to='/account'
  class='avatar'
)
  img(
    v-if='profilePicture'
    v-lazy='profilePicture'
    class='avatar__img'
  )
  img(
    v-if='profilePicture'
    v-lazy='profilePicture'
    class='avatar__img avatar__img--shadow'
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
      console.log(this.userData)
      const displayName = this.userData.displayName || this.userData.user.displayName
      return displayName ? displayName[0] : '?'
    },


    profilePicture () {
      const user = this.userData.user
      const profilePicture = user ? user.profilePicture : this.userData.profilePicture
      return profilePicture ? profilePicture : ''
    },


    ...mapGetters({
      getCurrentUserProfilePicture: 'auth/getCurrentUserProfilePicture'
    })
  }
}
</script>


<style lang='sass' scoped>

.avatar
  position: relative
  display: block

  &__img
    position: relative
    z-index: 50
    width: inherit
    height: inherit
    border-radius: 50%
    object-fit: cover

    &--shadow
      position: absolute
      z-index: 49
      top: $unit/2
      left: 0
      filter: blur($unit)
      opacity: 0.95
      transform: translateY(0.25) scale(0.75)

  &__text
    @extend %flex--row-center
    height: 100%
    border-radius: 50%
    border: 1px solid $grey

</style>
