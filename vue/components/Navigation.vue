<template lang='pug'>
div(
  :class='{ active: !routeId || routeId === "new", hide: route.name === "auth" }'
  class='nav'
)
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
    LogoMessenger(class='nav__logo')

  router-link(
    to='/account'
    class='nav__link'
  )
    LogoAccount(class='nav__logo')
</template>


<script>
import Avatar from './Avatar.vue'
import NavMenu from './NavMenu.vue'
import Logo from './Logo.vue'
import LogoMessenger from '~/assets/svg/logo-messenger.svg'
import LogoAccount from '~/assets/svg/logo-account.svg'
import { mapState } from 'vuex'

export default {
  components: {
    Logo,
    Avatar,
    NavMenu,
    LogoMessenger,
    LogoAccount
  },
  data () {
    return {}
  },
  computed: {
    ...mapState({
      route: state => state.route,
      routeId: state => state.route.params.id
    })
  }
}
</script>


<style lang='sass' scoped>
.nav
  @extend %flex--row-center
  display: none
  position: relative
  z-index: 51
  justify-content: space-around
  background: $white
  box-shadow: 0px -4px 24px rgba(34, 34, 34, 0.03)
  +mq-l
    display: flex
    flex-direction: column
    justify-content: center
    box-shadow: unset

  &.active
    display: flex

  &.hide
    display: none



  &__avatar

  &__link
    @extend %flex--row-center
    +mq-l
      margin-top: $unit*4

  &__logo
    width: $unit*3
    height: $unit*3

  & .container-dot
    display: grid
    grid-template-rows: repeat(2, 1fr)
    grid-template-columns: repeat(2, 1fr)
    display: none // temp

  & .dot
    width: 8px
    height: 8px
    background: $black
    margin: 2px

</style>
