 <template lang='pug'>
div.conversation

  //- conversation messages
  conversation-message.conversation__message

  //- message form
  div.conversation__message-form
    form(
      @submit.prevent='addMessage'
      class='message-form'
    )
      input(
        v-model.trim='newMessage'
        placeholder='Type a message...'
        class='message-form__input'
      )

</template>


<script>
import ConversationMessage from './ConversationMessage.vue'
import { mapState, mapMutations, mapActions } from 'vuex'

export default {
  components: {
    ConversationMessage
  },
  data () {
    return {
      messages: [],
      newMessage: '',
    }
  },
  methods: {
    addMessage () {
      const data = { message: this.newMessage }
      this.$route.params.id === 'new' ? this.addNewConversation(data) : this.addNewMessage(data)
    },


    ...mapActions({
      addNewMessage: 'messenger/addNewMessage',
      addNewConversation: 'messenger/addNewConversation'
    })
  }
}
</script>


<style lang='sass' scoped>

.conversation
  @extend %flex--column
  margin: 0 1px

  &__message
    flex: 1

  &__message-form
    height: $fs*4
    margin-top: 1px
    background: $white

.message-form

  &__input
    width: 100%
    background: transparent

</style>
