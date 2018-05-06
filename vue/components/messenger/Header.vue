<template lang='pug'>
header.header

  //- new message
  router-link(
    v-show='!isActive.users'
    @click.native='setList("users")'
    :to='{ name: "chatId", params: { id: "new" } }'
    class='header__icon header__new-message'
  )
    IconPlus(class='header__svg header__svg--primary')


  //- edit
  a(
    v-show='!isActive.users'
    @click=''
    class='header__icon header__edit'
  ) Edit


  //- back
  a(
    v-show='isActive.users'
    @click='cancelNewMembers'
    class='header__icon header__back'
  )
    IconChevron(class='header__svg')


  //- next
  a(
    v-show='isActive.users'
    @click='cancelNewMembers'
    class='header__icon header__next'
  ) Next

</template>


<script>
import IconNewMessage from '~/assets/svg/icon-new-message.svg'
import IconPlus from '~/assets/svg/icon-plus.svg'
import IconCheck from '~/assets/svg/icon-check-mark.svg'
import IconChevron from '~/assets/svg/icon-chevron.svg'
import { mapState, mapMutations } from 'vuex'


export default {
  components: {
    IconNewMessage,
    IconCheck,
    IconChevron,
    IconPlus
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


    ...mapState({
      activeList: state => state.messenger.app.activeList
    })
  },
  methods: {
    setList (value) {
      this.setActiveList({ value })
      this.navigation.list.includes(this.activeList) ? this.navigation.previous = this.activeList : this.navigation.list[0] || 'messages'
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
      setActiveList: 'messenger/SET_ACTIVE_LIST'
    })
  }
}
</script>


<style lang='sass' scoped>

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

  &__edit,
  &__back
    grid-row: 1 / 2
    grid-column: 1 / 2

  &__new-message,
  &__next
    grid-row: 1 / 2
    grid-column: 3 / 4

  &__edit

  &__back
    transform: rotate(-90deg)

  &__new-message

  &__next


</style>
