<template lang='pug'>
div.conversation-list
  ul.list
    li(
      v-for='(item, index) in conversationList'
      :key='index'
      class='list__item'
    )
      div.list__avatar
        img(
          v-lazy='item.profileUrl'
          class='list__img'
        )
      p.list__text {{ item.timestamp }}
  a() add chat room
</template>


<script>
import { mapState, mapGetters, mapMutations, mapActions } from 'vuex'

export default {
  data () {
    return {
      chatRoom: []
    }
  },
  computed: {
    currentUser () {
      console.log('---> ', this.conversations)
      console.log('mess ', this.getConversationMessages)
      return this.$store.getters['auth/getCurrentUser']
    },


    conversationList () {
      return [] //this.conversations
    },


    ...mapState({
      conversations: state => state.messenger.conversations
    }),


    ...mapGetters({
      getConversationMessages: 'messenger/getConversationMessages'
    })
  },
  methods: {
    newConversation () {
      console.log('state: ', this.conversations)
    },


    ...mapMutations({
      setConversationId: 'messenger/setConversationId'
    })
  },
  mounted () {
    this.currentUser
  }
}
</script>


<style lang='sass' scoped>

.conversation-list
  @extend %flex--column
  align-items: center
  background: $white

.list
  width: 66.66%
  margin-top: 4rem

  &__item
    @extend %flex
    align-items: center
    margin-bottom: 0.5rem
    &:last-child
      margin-bottom: unset

  &__avatar
    @extend %avatar--sm
    margin-right: 0.5rem


</style>
