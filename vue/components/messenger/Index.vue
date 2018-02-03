<template lang='pug'>
div.messenger
  //- conversation list
  conversation-list(
    class='messenger__conversation-list'
  )

  //- conversation
  conversation.messenger__conversation
</template>


<script>
import Conversation from './Conversation.vue'
import ConversationList from './ConversationList.vue'
import { mapActions } from 'vuex'

export default {
  components: {
    Conversation,
    ConversationList
  },
  data () {
    return {}
  },
  methods: {
    ...mapActions({
      initConversations: 'messenger/initConversations'
    })
  },
  created () {
    this.initConversations()
  }
}
</script>


<style lang='sass' scoped>

.messenger
  @extend %flex
  height: 100%
  background: $pri-cl
  box-shadow: 0px 0px 0.5rem rgba(33, 33, 33, 0.2)
  border-radius: 0.75%
  overflow: hidden

  &__conversation-list
    flex: 2

  &__conversation
    flex: 3

</style>
