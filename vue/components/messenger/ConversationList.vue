<template lang='pug'>
div.conversation-list
  //- router-link(
  //-   :to='{ name: "chat", params: { id: "new" } }'
  //- ) Add new message

  //- search form
  div.sidebar-container
    header.sidebar-container__inner
      h3 Messages
      form.search-form
        input(
          v-model='search'
          placeholder='Search...'
          class='search-form__input'
        )

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
    return {
      search: ''
    }
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
  @extend %flex
  justify-content: center


.sidebar-container
  position: fixed
  left: $border-offset
  top: 20vmin
  width: $golden-ratio-b
  @extend %flex
  justify-content: center

  & h3
    color: $black
    text-align: center
    border-bottom: 1px solid $grey
    font-size: $fs2


.search-form
  display: flex



  &__input
    width: 100%
    background: transparent

  &__submit
    background: transparent


.list
  width: 100%
  margin-top: 4rem
  display: grid
  grid-template-columns: repeat(3, 1fr)
  grid-gap: 8px
  max-width: 600px
  justify-items: center
  align-items: center

  &__item
    @extend %flex
    align-items: center
    margin-bottom: 0.5rem
    background: $white
    width: 100%
    height: 100%
    &:last-child
      margin-bottom: unset

  &__avatar
    @extend %avatar--sm
    margin-right: 0.5rem


</style>
