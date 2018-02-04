<template lang='pug'>
router-link(
  to='/account'
  class='avatar'
)
  img(
    v-lazy='getCurrentUserProfilePicture'
    class='avatar__img'
  )
</template>


<script>
import { mapGetters } from 'vuex'

export default {
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

</style>
