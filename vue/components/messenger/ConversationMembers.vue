<template lang='pug'>
section(class='members')

  //- add member button
  a(
    @click='setList("users")'
    class='members__icon'
  )
    IconPlus.members__svg


  //- active conversation members
  ul(class='members__list')
    li(
      v-for='(user, index) in members'
      :key='index'
      class='members__item'
    )
      MemberCard(
        :item='user'
        :index='index'
        :activeMemberIndex='activeMemberIndex'
        @selectMember='setActiveMember(index)'
        class='members__card'
      )

</template>


<script>
import IconPlus from '~/assets/svg/icon-plus.svg'
import MemberCard from './MemberCard.vue'
import { mapGetters, mapMutations, mapState } from 'vuex'

export default {
  components: {
    MemberCard,
    IconPlus
  },
  data () {
    return {
      activeMemberIndex: 0
    }
  },
  computed: {
    ...mapGetters({
      members: 'messenger/getActiveConversationMembers'
    })
  },
  methods: {
    setActiveMember (index) {
      this.activeMemberIndex = index
    },


    setList (value) {
      console.log('value: ', value)
      this.setActiveList({ value })
    },


    ...mapMutations({
      setActiveList: 'messenger/setActiveList'
    })
  }
}
</script>


<style lang='sass' scoped>

.members
  position: relative
  height: 25vmin
  margin-bottom: 1px
  padding: $unit*2
  @extend %flex--column
  justify-content: center
  align-items: center
  background: $white


  &__list
    position: relative

  &__item
    position: absolute
    top: 50%
    left: 50%
    transform: translate(-50%, -50%)


  &__icon
    position: absolute
    top: 0
    right: 0
    width: 48px
    height: 48px
    @extend %flex
    justify-content: center
    align-items: center

  &__svg
    height: $fs
    fill: $dark

</style>
