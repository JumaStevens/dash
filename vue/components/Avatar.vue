<template lang='pug'>
div.avatar
  img(
    v-lazy='imgSrc'
  ).avatar__img
</template>


<script>
import axios from 'axios'

export default {
  data () {
    return {
      imgSrc: 'https://images.unsplash.com/photo-1476493279419-b785d41e38d8?ixlib=rb-0.3.5&s=2b2719aba7cdfee4514549ffe55e25d5&dpr=1&auto=format&fit=crop&w=1000&q=80&cs=tinysrgb'
    }
  },
  methods: {
    async getImgSrc () {
      try {
        const res = await axios.get('')
      }
      catch (e) {
        console.log('Avatar/getImgSrc Error: ', e)
      }
    }
  },
  beforeMount () {
    //this.getImgSrc()
  }
}
</script>


<style lang='sass'>
@import '../assets/sass/main.sass'

.avatar
  @extend %avatar--l
</style>
