<template lang='pug'>
div.conversation-list
  //- router-link(
  //-   :to='{ name: "chat", params: { id: "new" } }'
  //- ) Add new message



  //- search form
  form.search-form
    icon-search.search-form__icon
    input(
      v-model='search'
      placeholder='Search messenger'
      class='search-form__input'
    )


  //- conversation list
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
          v-lazy='"https://tinyurl.com/ybzmyf2z"'
          class='list__img'
        )
      p.list__name Sarah Smith
      p.list__text {{ item.lastMessage }}
      p.list__date Fri

</template>


<script>
import IconSearch from '~/assets/svg/icon-search.svg'
import { mapState, mapGetters, mapMutations, mapActions } from 'vuex'

export default {
  components: {
    IconSearch
  },
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
  @extend %flex--column

.search-form
  @extend %flex
  align-items: center
  height: $fs*4
  margin-bottom: 1px
  background: $white
  padding: 0 $unit*2

  &__icon
    margin-right: $unit*2

  &__input
    width: 100%
    background: transparent


.list
  height: 100%
  overflow-y: auto


  &__item
    height: $fs*4
    display: grid
    grid-template-rows: repeat(2, auto)
    grid-template-columns: auto 1fr auto
    grid-gap: $unit/2 $unit
    background: $white
    padding: $unit $unit*2

  &__avatar
    @extend %avatar
    grid-row: 1 / 3
    grid-column: 1 / 2
    width: 48px
    height: 48px

  &__name
    grid-row: 1 / 2
    grid-column: 2 / 3
    font-weight: 900

  &__text
    grid-row: 2 / 3
    grid-column: 2 / 3
    color: $dark
    overflow: hidden
    white-space: nowrap
    text-overflow: ellipsis

  &__date
    grid-row: 1 / 2
    grid-column: 3 / 4



</style>
