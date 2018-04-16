<template lang='pug'>
aside.controller

  //- new message icon
  router-link(
    v-show='!isActive.users'
    @click.native='setList("users")'
    :to='{ name: "chatId", params: { id: "new" } }'
    class='controller__icon controller__icon--right'
  )
    icon-new-message.controller__svg


  //- check mark icon
  a(
    v-show='isActive.users'
    @click='addNewMembers'
    class='controller__icon'
  )
    icon-check.controller__svg


  //- cancel icon
  a(
    v-show='isActive.users'
    @click='cancelNewMembers'
    class='controller__icon controller__icon--right'
  )
    icon-cancel.controller__svg


  //- search form
  form(
    v-show='isActive.users || isActive.search'
    class='controller__search-form search-form'
  )
    //- search icon
    a(
      v-show='!isActive.users || isActive.search'
      @click='toggleSearch'
      class='controller__icon'
    )
      icon-search.controller__svg

    input(
      v-model='search'
      placeholder='Search messenger...'
      class='search-form__input'
    )

</template>


<script>
import IconSearch from '~/assets/svg/icon-search.svg'
import IconNewMessage from '~/assets/svg/icon-new-message.svg'
import IconCheck from '~/assets/svg/icon-check-mark.svg'
import IconCancel from '~/assets/svg/icon-cancel.svg'
import { mapState, mapMutations } from 'vuex'


export default {
  components: {
    IconSearch,
    IconNewMessage,
    IconCheck,
    IconCancel
  },
  data () {
    return {
      navigation: {
        list: ['messages', 'pending', 'active'],
        previous: ''
      }
    }
  },
  created () {
    this.navigation.previous = this.activeList
  },
  computed: {
    isActive () {
      const data = {}
      const values = [...this.navigation.list, 'users', 'search']
      values.forEach(val => data[val] = this.activeList === val)
      return data
    },


    search: {
      get () {
        return this.searchState
      },
      set (value) {
        this.updateSearch({ value })
      }
    },


    ...mapState({
      activeList: state => state.messenger.app.activeList,
      searchState: state => state.messenger.app.search
    })
  },
  methods: {
    setList (value) {
      this.setActiveList({ value })
      this.navigation.list.includes(this.activeList) ? this.navigation.previous = this.activeList : this.navigation.list[0] || 'messages'
    },


    toggleSearch () {
      this.activeList === 'search' ? this.setActiveList({ value: this.navigation.previous }) : this.setActiveList({ value: 'search' })
      console.log('toggle: ', this.navigation)
    },


    addNewMembers () {
      this.setList("messages")
      this.$emit('confirmMemberQueue')
    },


    cancelNewMembers () {
      this.setActiveList({ value: this.navigation.previous })
      this.$emit('cancelMemberQueue')
    },


    ...mapMutations({
      setActiveList: 'messenger/SET_ACTIVE_LIST',
      updateSearch: 'messenger/UPDATE_APP_SEARCH'
    })
  }
}
</script>


<style lang='sass' scoped>

.controller
  display: grid
  grid-template-rows: auto
  grid-template-columns: 48px 1fr 48px
  grid-gap: $unit*4 $unit
  align-items: stretch
  padding: 0 $unit*2
  margin: $unit*2 0

  &__icon
    grid-column: 1 / 2
    @extend %flex--row-center
    width: $unit*6
    height: $unit*6

    &--right
      grid-column: 3 / 4

  &__svg
    width: auto
    height: $fs
    fill: $dark


.search-form
  grid-row: 1 / 2
  grid-column: 1 / 3
  @extend %flex
  align-items: flex-end
  background: $grey

  &__input
    width: 100%
    background: transparent
    color: $dark
    padding: $unit 0

    &::placeholder
      color: $dark


.navigation-list
  grid-row: 2 / 3
  grid-column: 2 / 3
  min-height: $unit*6
  @extend %flex
  align-items: flex-end
  border-bottom: 1px solid $pri-cl

  &__item
    margin-right: $unit*5

    &:last-child
      margin-right: unset

  &__link
    position: relative
    display: block
    padding: $unit 0
    color: $dark
    text-transform: capitalize

    &::before
      content: ''
      position: absolute
      top: 100%
      left: 0
      width: 100%
      height: 1px
      background: $black
      opacity: 0

    &.active
      color: $black

      &::before
        opacity: 1


</style>
