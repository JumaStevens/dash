<template lang='pug'>
header(class='header')

  //- logo
  div.header__logo
    icon-messenger.header__logo-svg
    h2.header__logo-text Messenger

</template>


<script>
import IconMessenger from '~/assets/svg/logo-messenger.svg'
import { mapGetters, mapMutations, mapState } from 'vuex'

export default {
  components: {
    IconMessenger
  }
}
</script>


<style lang='sass' scoped>

.header
  display: grid
  grid-template-columns: repeat(3, 1fr)
  height: $fs*4
  align-items: center
  padding: 0 $unit*2
  margin-bottom: 2px
  background: $white

  &__logo
    display: flex
    grid-column: 1 / 2

  &__logo-svg
    height: $fs*1.5
    margin-right: $unit

  &__logo-text
    color: $black
    font-size: $fs
    font-weight: 900

</style>
