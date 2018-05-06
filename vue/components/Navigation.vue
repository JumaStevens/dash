<template lang='pug'>
div(
  v-show='!routeId || routeId === "new"'
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
    LogoMessenger.nav__logo
</template>


<script>
import Avatar from './Avatar.vue'
import NavMenu from './NavMenu.vue'
import Logo from './Logo.vue'
import LogoMessenger from '~/assets/svg/logo-messenger.svg'
import { mapState } from 'vuex'

export default {
  components: {
    Logo,
    Avatar,
    NavMenu,
    LogoMessenger
  },
  data () {
    return {}
  },
  computed: {
    ...mapState({
      routeId: state => state.route.params.id
    })
  }
}
</script>


<style lang='sass' scoped>
.nav
  @extend %flex--row-center
  justify-content: space-around
  position: relative
  z-index: 51
  background: $white
  box-shadow: 0px -4px 24px rgba(34, 34, 34, 0.03)
  +mq-l
    display: flex
    justify-content: center
    position: fixed
    top: 0
    left: 0
    width: 64px
    height: 100%


  &__avatar

  &__link
    @extend %flex--row-center

  &__logo
    height: 24px

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
