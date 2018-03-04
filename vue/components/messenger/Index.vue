<template lang='pug'>
div(class='container messenger')

  //- conversation header
  ConversationHeader(class='messenger__conversation-header')

  //- conversation list
  ConversationList(
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


  //- media
  ConversationMedia(
    class='messenger__conversation-media'
  )


</template>


<script>
import ConversationHeader from './ConversationHeader.vue'
import Conversation from './Conversation.vue'
import ConversationList from './ConversationList.vue'
import ConversationMembers from './ConversationMembers.vue'
import ConversationMedia from './ConversationMedia.vue'
import { mapActions } from 'vuex'

export default {
  components: {
    ConversationHeader,
    Conversation,
    ConversationList,
    ConversationMembers,
    ConversationMedia
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

  &__conversation-members
    grid-row: 2 / 3
    grid-column: 3 / 4

  &__conversation-media
    grid-row: 3 / 4
    grid-column: 3 / 4
    background: pink


</style>
