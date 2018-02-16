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
      newMembers: [],
    }
  },
  methods: {
    addMessage () {
      const data = {
        message: this.newMessage
      }

      console.log('dd: ', this.$route.params.id)

      if (this.$route.params.id === 'new') {
        data['members'] = this.newMembers
        this.addNewConversation(data)
      }
      else {
        console.log('ddd')
        this.addNewMessage(data)
      }
    },


    addMember (uid) {
      if (!this.newMembers.includes(uid)) this.newMembers.push(uid)
      console.log('newMembers: ', this.newMembers)
    },


    ...mapActions({
      addNewMessage: 'messenger/addNewMessage',
      addNewConversation: 'messenger/addNewConversation'
    })
  },
  created() {
    console.log('state:: ', this.$store.state)
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
