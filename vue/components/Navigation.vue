<template lang='pug'>
div.nav
  //- avatar.nav__avatar
  //- nav-menu.nav__nav-menu
  //- logo.nav__logo

  .container-dot
    .dot
    .dot
    .dot
    .dot

  router-link(
    to='/chat'
    class='nav__link'
  )
    LogoMessenger.nav__logo
</template>


<script>
import Avatar from './Avatar.vue'
import NavMenu from './NavMenu.vue'
import Logo from './Logo.vue'
import LogoMessenger from '~/assets/svg/logo-messenger.svg'

export default {
  components: {
    Logo,
    Avatar,
    NavMenu,
    LogoMessenger
  },
  data () {
    return {}
  }
}
</script>


<style lang='sass' scoped>
.nav
  @extend %flex--column-center
  justify-content: center
  position: fixed
  top: 0
  left: 0
  width: 64px
  height: 100%
  padding: 24px 0
  background: $white

  &__avatar
    margin-bottom: 16px

  &__link
    margin-top: 24px
    display: none // temp

  &__logo
    width: 24px

  & .container-dot
    display: grid
    grid-template-rows: repeat(2, 1fr)
    grid-template-columns: repeat(2, 1fr)

  & .dot
    width: 8px
    height: 8px
    background: $black
    margin: 2px

</style>
