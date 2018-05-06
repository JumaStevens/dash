 <template lang='pug'>
section(
  :class='{ active: routeId && routeId !== "new" }'
  class='conversation'
)

  //- header
  header(
    class='header'
  )
    //- back
    router-link(
      :to='{ name: "chat" }'
      class='header__icon header__back'
    )
      IconChevron(class='header__svg')


  //- lists container
  div(class='lists-container')

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
          placeholder='Say something...'
          class='message-form__input'
        )
        input(
          type='submit'
          style='display: none'
        )

</template>


<script>
import ConversationMessage from './ConversationMessage.vue'
import IconChevron from '~/assets/svg/icon-chevron.svg'
import Header from '~comp/messenger/Header.vue'
import { mapState, mapGetters, mapMutations, mapActions } from 'vuex'


export default {
  components: {
    ConversationMessage,
    Header,
    IconChevron
  },
  data () {
    return {
      messages: [],
      newMessage: '',
    }
  },
  computed: {

    ...mapState({
      activeList: state => state.messenger.app.activeList,
      routeId: state => state.route.params.id
    }),


    ...mapGetters({
      members: 'messenger/getActiveConversationMembers'
    })
  },
  methods: {
    addMessage () {
      const data = { message: this.newMessage }
      this.$route.params.id === 'new' ? this.addNewConversation(data) : this.addNewMessage(data)
      this.newMessage = ''
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
  display: none
  background: $white

  &.active
    display: flex

  &__message
    flex: 1

  &__message-form
    @extend %flex
    position: fixed
    left: 0
    bottom: 0
    width: 100%
    height: $unit*6
    background: $white

.message-form
  width: 100%

  &__input
    width: 100%
    height: 100%
    padding: $unit $unit*2
    background: transparent


.header
  position: relative
  z-index: 50
  display: grid
  grid-gap: $unit*2 0
  align-items: center
  grid-template-columns: auto 1fr auto
  box-shadow: 0px 4px 24px rgba(34, 34, 34, 0.03)

  &__icon
    min-width: $unit*6
    height: $unit*6
    padding: $unit*2

  &__svg
    width: auto
    height: $fs
    fill: $dark

    &--primary
      fill: rgba(110, 188, 228, 1)

  &__back
    grid-row: 1 / 2
    grid-column: 1 / 2


  &__back
    transform: rotate(-90deg)


.lists-container
  height: calc(100vh - (48px + 48px))
  overflow-y: auto
  padding: 0 $unit*2


</style>
