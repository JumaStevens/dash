<template lang='pug'>
div(class='container messenger')

  //- conversation header
  conversation-header(class='messenger__conversation-header')

  //- conversation list
  conversation-list(
    class='messenger__conversation-list'
  )

  //- conversation
  conversation(
    class='messenger__conversation'
  )
</template>


<script>
import ConversationHeader from './ConversationHeader.vue'
import Conversation from './Conversation.vue'
import ConversationList from './ConversationList.vue'
import { mapActions } from 'vuex'

export default {
  components: {
    ConversationHeader,
    Conversation,
    ConversationList
  },
  data () {
    return {}
  },
  computed: {

  },
  created () {
    this.fetchData()
  },
  methods: {
    fetchData () {
      this.initConversations()
    },


    ...mapActions({
      initConversations: 'messenger/initConversations'
    })
  }
}
</script>


<style lang='sass' scoped>

.container
  height: 100%
  display: grid
  grid-template-rows: auto auto 1fr
  grid-template-columns: 1fr 2fr 1fr

.messenger
  background: $pri-cl

  &__conversation-header
    grid-row: 1 / 2
    grid-column: 1 / 4

  &__conversation-list
    grid-row: 2 / 4
    grid-column: 1 / 2

  &__conversation
    grid-row: 2 / 4
    grid-column: 2 / 3




</style>
