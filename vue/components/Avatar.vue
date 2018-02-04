<template lang='pug'>
router-link(
  to='/account'
  class='avatar'
)
  img(
    v-lazy='imgSrc'
    class='avatar__img'
  )
</template>


<script>

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

</style>
