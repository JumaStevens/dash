<template lang='pug'>
div.nav
  logo.nav__logo
  nav-menu.nav__nav-menu
  avatar.nav__avatar
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


<style lang='sass'>
.nav
  display: flex
  align-items: center

  &__logo
    margin-right: auto

  &__avatar
    margin-left: 1rem

  &__nav-menu


</style>
