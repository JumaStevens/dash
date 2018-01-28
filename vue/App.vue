<template lang='pug'>
div.app
  navigation.app__nav
  p(style='position: fixed') user active: {{ active }}
  error-404-view(v-if='error.isError && error.type == "404"').app__error
  router-view(v-else).app__view
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
    active () {
      return this.$store.state.user.isUser
    }
  },
  methods: {
    revealState () {
      const state = this.$store.state
      console.log('state: ', state)
    }
  },
  beforeMount () {
    this.revealState()
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
