<template lang='pug'>
div.logo
  router-link(
    :to='url'
  ).logo__link
    p.logo__text {{ text }}

</template>


<script>
import generalData from '../data/general.json'

export default {
  components: {

  },
  data () {
    return {
      text: '',
      url: ''
    }
  },
  methods: {
    setLogo () {
      const data = generalData
      const logo = data.logo
      this.text = logo.text
      this.url = logo.url
    }
  },
  beforeMount () {
    this.setLogo()
  }
}
</script>


<style lang='sass'>

</style>
