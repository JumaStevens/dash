<template lang='pug'>
section(class='members')

  a(
    @click='toggleActions'
    class='members__icon members__actions'
  )
    icon-actions.members__svg

  div(
    v-show='showActions'
    class='members__actions-container'
  )
    //- add member button
    a(
      @click='setList("users")'
      class='members__icon'
    )
      IconPlus.members__svg

    //- remove member button
    a(
      @click='removeMember()'
      class='members__icon'
    )
      IconBan.members__svg


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
import IconActions from '~/assets/svg/icon-actions.svg'
import IconPlus from '~/assets/svg/icon-plus.svg'
import IconBan from '~/assets/svg/icon-ban.svg'
import MemberCard from './MemberCard.vue'
import { mapGetters, mapMutations, mapActions, mapState } from 'vuex'

export default {
  components: {
    MemberCard,
    IconPlus,
    IconActions,
    IconBan
  },
  data () {
    return {
      activeMemberIndex: 0,
      showActions: false,
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


    toggleActions () {
      this.showActions = !this.showActions
    },


    removeMember () {
      const member = this.members[this.activeMemberIndex]
      console.log('memeber: ', member)
      this.deleteMembers({ uid: member.uid })
    },


    ...mapMutations({
      setActiveList: 'messenger/SET_ACTIVE_LIST',
    }),


    ...mapActions({
      deleteMembers: 'messenger/deleteMembers'
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

  &__actions-container
    position: absolute
    top: $unit*3
    right: $unit*6
    transform: translateY(-50%)
    @extend %flex
    justify-content: center


  &__list
    position: relative

  &__item
    position: absolute
    top: 50%
    left: 50%
    transform: translate(-50%, -50%)

  &__icon
    width: $unit*2
    height: $unit*2
    @extend %flex
    justify-content: center
    align-items: center

  &__svg
    width: auto
    height: $fs
    fill: $dark

  &__actions
    position: absolute
    top: 0
    right: 0
    width: $unit*6
    height: $unit*6



</style>
