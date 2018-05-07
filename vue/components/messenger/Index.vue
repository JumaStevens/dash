<template lang='pug'>
div(class='container messenger')

  ListMessages(
    class='messenger__conversation-list'
  )

  ListUsers(
    class='messenger__conversation-list'
  )

  //- conversation
  Conversation(
    class='messenger__conversation'
  )

  //- members
  ConversationMembers(
    class='messenger__conversation-members'
  )


</template>


<script>
import ConversationHeader from './ConversationHeader.vue'
import Conversation from './Conversation.vue'
import ConversationMembers from './ConversationMembers.vue'
import ListUsers from './ListUsers.vue'
import ListMessages from './ListMessages.vue'
import { mapActions } from 'vuex'

export default {
  components: {
    ConversationHeader,
    Conversation,
    ConversationMembers,
    ListUsers,
    ListMessages
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
      this.initFriends()
    },


    ...mapActions({
      initConversations: 'messenger/init',
      initFriends: 'friends/initFriends'
    })
  }
}
</script>


<style lang='sass' scoped>

.container
  display: grid
  grid-template-rows: 1fr
  grid-template-columns: 1fr
  height: 100%
  +mq-l
    grid-template-rows: auto auto 1fr
    grid-template-columns: auto 1fr
    align-items: stretch

.messenger
  background: $pri-cl

  &__conversation-header
    position: relative
    grid-row: 1 / -1
    grid-column: 1 / -1
    +mq-l
      grid-row: 1 / 2
      grid-column: 1 / -1

  &__conversation-list
    position: relative
    z-index: 2
    grid-row: 1 / -1
    grid-column: 1 / -1
    +mq-l
      grid-row: 2 / 4
      grid-column: 1 / 2

  &__conversation
    position: relative
    z-index: 4
    // display: none !important
    grid-row: 1 / -1
    grid-column: 1 / -1
    +mq-l
      grid-row: 2 / 4
      grid-column: 2 / -1

  &__conversation-members
    position: relative
    z-index: 5
    grid-row: 1 / -1
    grid-column: 1 / -1
    +mq-l
      grid-row: 2 / 4
      grid-column: 1 / 2



</style>
