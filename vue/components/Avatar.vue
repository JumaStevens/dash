<template lang='pug'>
router-link(
  to='/account'
  class='avatar'
)
  img(
    v-lazy='userData.user.profilePicture'
    class='avatar__img'
  )
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
    ...mapGetters({
      getCurrentUserProfilePicture: 'auth/getCurrentUserProfilePicture'
    })
  }
}
</script>


<style lang='sass' scoped>

.avatar
  @extend %avatar
  // display: none
  width: 32px
  height: 32px

</style>
