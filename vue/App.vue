<template lang='pug'>
.vue-app
  p(style='position: fixed').auth-hud Auth: {{ isCurrentUser }}

  navigation(
    v-if='isCurrentUser'
  ).vue-app__nav

  .sidebar
    .container-dot
      .dot
      .dot
      .dot
      .dot

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
  display: grid
  grid-template-rows: 15vmin 1fr 15vmin
  grid-template-columns: repeat(12, 1fr)
  background: $pri-cl

  &__nav
    grid-row: 1 / 2
    grid-column: 3 / 11

  &__error,
  &__view
    grid-row: 2 / 3
    grid-column: 3 / 11

.fade-enter-active, .fade-leave-active
  transition: opacity 150ms, transform 150ms

.fade-enter, .fade-leave-to
  transform: translateY(5vmin)
  opacity: 0


.sidebar
  @extend %flex--column-center
  grid-row: 1 / 4
  grid-column: 1 / 2
  background: $pri-cl
  box-shadow: 0px 0px 0.5rem rgba(34,34,34,0.2) //rgba(15, 114, 219, 0.2)
  width: 40px



  & .container-dot
    display: grid
    grid-template-rows: repeat(2, 1fr)
    grid-template-columns: repeat(2, 1fr)

  & .dot
    width: 8px
    height: 8px
    background: $black
    margin: 2px

.auth-hud
  display: none
</style>
