<template lang='pug'>
div.messenger
  //- conversation list
  conversation-list(
    v-if='isRoot'
    class='messenger__conversation-list'
  )

  //- conversation
  conversation(
    v-if='!isRoot'
    class='messenger__conversation'
  )
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
  computed: {
    isRoot () {
      console.log('isRoot: ', this.$route)
      return this.$route.path === `/${this.$route.name}`
    }
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

.messenger
  min-height: 100vh
  background: $pri-cl
  //box-shadow: 0px 0px 0.5rem rgba(33, 33, 33, 0.2)
  border-radius: 0.75%
  overflow: hidden
  @extend %grid--golden-ratio

  &__conversation-list
    grid-column: 1 / 2

  &__conversation

    grid-column: 2 / 3


</style>
