<template lang='pug'>
div.conversation__header
  header.header
    div.header__avatar
      img().header__image
    p.header__text name dawg
    pre {{ members }}

</template>


<script>
import { mapGetters } from 'vuex'

export default {
  data () {
    return {}
  },
  computed: {
    ...mapGetters({
      members: 'messenger/getActiveConversationMembers'
    })
  }
}
</script>


<style lang='sass' scoped>

.header
  @extend %flex

  &__avatar
    @extend %avatar--sm
    margin-right: 0.5rem

</style>
