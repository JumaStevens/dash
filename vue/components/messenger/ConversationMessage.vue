<template lang='pug'>
//- message
div.message

  ul.message__list

    li(
      v-for='(message, index) in messages'
      :key='index'
      class='message__item'
    )

      MessageCard(
        :message='message'
        @deleteMessage='deleteMessage'
        class='message__card'
      )

</template>


<script>
import MessageCard from './MessageCard.vue'
import { mapGetters, mapActions } from 'vuex'

export default {
  components: {
    MessageCard
  },
  computed: {
    ...mapGetters({
      messages: 'messenger/getConversationMessages'
    })
  },
  watch: {
    '$route': 'getMessages'
  },
  methods: {
    getMessages () {
      const id = this.$route.params.id
      if (id && id !== 'new') this.fetchMessages(id)
    },


    deleteMessage (message) {
      console.log('logMessage: ', message)
      const data = {
        convoId: this.$route.params.id,
        messageId: message.id
      }
      this.deleteMessages(data)
    },


    ...mapActions({
      fetchMessages: 'messenger/fetchMessages',
      deleteMessages: 'messenger/deleteMessages'
    })
  },
  created () {
    this.getMessages()
  }
}
</script>


<style lang='sass' scoped>
.message
  background: $white

  &__list
    @extend %flex--column

  &__item
    width: 100%
    padding: $unit*2 $unit


</style>
