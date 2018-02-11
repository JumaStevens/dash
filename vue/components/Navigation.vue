<template lang='pug'>
div.nav
  avatar.nav__avatar
  nav-menu.nav__nav-menu
  logo.nav__logo
</template>


<script>
import Avatar from './Avatar.vue'
import NavMenu from './NavMenu.vue'
import Logo from './Logo.vue'

export default {
  components: {
    Logo,
    Avatar,
    NavMenu
  },
  data () {
    return {}
  }
}
</script>


<style lang='sass' scoped>
.nav
  @extend %flex
  align-items: center
  display: none

  &__avatar
    margin-right: auto
</style>
