<template lang='pug'>
div.nav
  avatar.nav__avatar
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
  justify-content: flex-start
  padding: 24px 0
  position: fixed
  top: 0
  left: 0
  background: $white
  // box-shadow: 0px 0px 0.5rem rgba(34,34,34,0.2) //rgba(15, 114, 219, 0.2)
  box-shadow: 0px 0px 1rem rgba(34,34,34,0.2)
  // width: $border-offset
  width: 64px
  height: 100%

  &__avatar
    margin-bottom: 16px

  &__link
    margin-top: 56px

  &__logo
    width: 24px

  & .container-dot
    border-top: 1px solid $pri-cl
    padding: 16px 4px

    display: grid
    grid-template-rows: repeat(2, 1fr)
    grid-template-columns: repeat(2, 1fr)

  & .dot
    width: 8px
    height: 8px
    background: $black
    margin: 2px

</style>
