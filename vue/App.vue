<template lang='pug'>
.vue-app

  navigation(
    v-if='isCurrentUser'
    class='vue-app__nav'
  )

  transition(name='swipe')
    error-404-view(
      v-if='error.isError && error.type == "404"'
      class='vue-app__error'
    )
    router-view(
      v-if='isCurrentUser'
      class='vue-app__view'
    )
</template>


<script>
import Error404View from './views/Error404View.vue'
import Navigation from './components/Navigation.vue'

export default {
  components: {
    Error404View,
    Navigation
  },
  data () {
    return {}
  },
  computed: {
    error () {
      return this.$store.state.error
    },
    isCurrentUser () {
      return this.$store.getters['auth/isCurrentUser']
    }
  },
  beforeCreate () {
    this.$store.dispatch('auth/watchAuthState')
  }
}
</script>


<style lang='sass'>
@import './assets/sass/main.sass'

.vue-app
  display: grid
  grid-template-rows: calc(100vh - 48px) 48px
  align-items: stretch
  background: $white
  +mq-l
    grid-template-rows: 100vh
    grid-template-columns: 64px 1fr


  &__error,
  &__view
    grid-row: 1 / 2
    +mq-l
      grid-row: 1 / 2
      grid-column: 2 / 3


  &__nav
    grid-row: 2 / 3
    +mq-l
      grid-row: 1 / 2
      grid-column: 1 / 2


// .swipe-enter-active
//   transition: opacity 250ms 250ms
//
// .swipe-leave-active
//   transition: opacity 250ms
//
//
// .swipe-enter, .swipe-leave-to
//   opacity: 0

</style>
