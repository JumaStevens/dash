<template lang='pug'>
div.container
  //- conversation list
  conversation-list(
    v-on:newConversation='newConversation'
    class='messenger__conversation-list'
  )

  //- conversation
  conversation.messenger__conversation
</template>

<script>
import Conversation from './Conversation.vue'
import ConversationList from './ConversationList.vue'

export default {
  components: {
    Conversation,
    ConversationList
  },
  data () {
    return {
      newConversationRequest: false
    }
  },
  methods: {
    newConversation () {
      this.newConversationRequest = true
      console.log('truth: ', this.newConversationRequest)
    }
  }
}
</script>


<style lang='sass' scoped>


.container
  background: $pri-cl
  @extend %flex
  box-shadow: 0px 0px 0.5rem rgba(33, 33, 33, 0.2)
  border-radius: 0.75%
  overflow: hidden

  &__conversation-list
    flex: 2

  &__conversation
    flex: 3

</style>
