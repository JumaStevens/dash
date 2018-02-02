<template lang='pug'>
div.conversation-list
  h1 hello
  ul.list
    li(
      v-for='(item, index) in chatRoom'
      :key='index'
      class='list__item'
    )
      div.list__avatar
        img(
          v-lazy='item.avatarSrc'
          class='list__img'
        )
      p.list__text {{ item.fullName }} | {{ conversations }}
  a(
    @click='newConversation'
  ) add chat room

</template>


<script>
import { mapMutations, mapActions } from 'vuex'
import chatData from '~/data/chat.json'

export default {
  data () {
    return {
      chatRoom: []
    }
  },
  computed: {
    currentUser () {
      return this.$store.getters['auth/getCurrentUser']
    },
    conversations () {
      return this.$store.state.messenger.conversationId
    }
  },
  methods: {
    setChatRoom () {
      const data = chatData.room
      this.chatRoom = data
    },
    newConversation () {
      this.$emit('newConversation')
    },
    ...mapMutations({
      setConversationId: 'messenger/setConversationId'
    }),
    ...mapActions({
      createConversation: 'messenger/createConversation'
    })
  },
  beforeMount () {
    this.setChatRoom()
  }
}
</script>


<style lang='sass'>
@import '../../assets/sass/main.sass'

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
