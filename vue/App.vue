<template lang='pug'>
.vue-app

  navigation(
    v-if='isCurrentUser'
    class='vue-app__nav'
  )

  transition(name='fade')
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
  width: 100vw
  height: 100vh
  background: $pri-cl
  display: grid
  // grid-template-columns: $border-offset 1fr
  grid-template-columns: 64px 1fr

  &__error,
  &__view
    width: 100%
    min-height: 100%
    grid-column: 2 / 3

  &__nav
    grid-column: 1 / 2

.fade-enter-active, .fade-leave-active
  transition: opacity 150ms, transform 150ms

.fade-enter, .fade-leave-to
  transform: translateY(5vmin)
  opacity: 0



</style>
