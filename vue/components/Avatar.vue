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
      imgSrc: 'https://tinyurl.com/y73mku5w'
    }
  }
}
</script>


<style lang='sass' scoped>

.avatar
  @extend %avatar--l
  width: 400px
</style>
