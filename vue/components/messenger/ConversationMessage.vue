<template lang='pug'>
//- message
div.message

  ul.message__list

    li(
      v-for='(message, index) in messages'
      :key='index'
      :class='{ fromSelf: message.fromSelf }'
      class='message__item'
    )

      MessageCard(
        :message='message'
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
      messages: 'messenger/getConversationMessages',
      members: 'messenger/getActiveConversationMembers'
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


    ...mapActions({
      fetchMessages: 'messenger/fetchMessages'
    })
  },
  created () {
    this.getMessages()
  }
}
</script>


<style lang='sass' scoped>
.message
  overflow-y: auto
  background: $white

  &__list
    @extend %flex--column

  &__item
    width: 100%
    padding: $unit*2 $unit*4


</style>
