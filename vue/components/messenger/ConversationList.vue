<template lang='pug'>
div.conversation-list
  router-link(
    :to='{ name: "chat", params: { id: "new" } }'
  ) Add new message

  ul.list
    router-link(
      v-for='(item, index) in conversationMeta'
      :key='index'
      tag='li'
      :to='{ name: "chat", params: { id: item.id } }'
      class='list__item'
    )
      div.list__avatar
        img(
          v-lazy=''
          class='list__img'
        )
      p.list__text {{ item.lastMessage }}
</template>


<script>
import { mapState, mapGetters, mapMutations, mapActions } from 'vuex'

export default {
  data () {
    return {}
  },
  computed: {
    conversationMeta () {
      return this.getConversationMeta
    },

    ...mapGetters({
      getConversationMeta: 'messenger/getConversationMeta'
    })
  },
  methods: {
    openConversation (id) {
      this.setConversationId(id)
      this.fetchMessages(id)
    },


    ...mapMutations({
      setConversationId: 'messenger/setConversationId'
    }),


    ...mapActions({
      fetchMessages: 'messenger/fetchMessages'
    })
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
    background: $pri-cl
    &:last-child
      margin-bottom: unset

  &__avatar
    @extend %avatar--sm
    margin-right: 0.5rem


</style>
