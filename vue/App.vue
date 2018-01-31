<template lang='pug'>
div.app
  navigation.app__nav
  p(style='position: fixed') Auth: {{ isCurrentUser }}
  error-404-view(v-if='error.isError && error.type == "404"').app__error
  router-view(v-else-if='isCurrentUser').app__view
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
      return this.$store.getters['user/isCurrentUser']
    }
  },
  beforeCreate () {
    this.$store.dispatch('user/watchAuthState')
  }
}
</script>


<style lang='sass'>
@import './assets/sass/main.sass'

.app
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
</style>
