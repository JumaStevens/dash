<template lang='pug'>
div

  error-404-view(v-if='error.isError && error.type == "404"')
  router-view(v-else)
</template>


<script>
import Error404View from './views/Error404View.vue'

export default {
  components: {
    Error404View
  },
  data () {
    return {}
  },
  computed: {
    error () {
      return this.$store.state.error
    }
  }
}
</script>


<style lang='sass'>


</style>
