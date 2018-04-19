<template lang='pug'>
section(
  v-if='isActive'
  :class='{ active: isActive }'
  class='members'
)

  //- handlebar icon
  router-link(
    :to='{ name: "chat" }'
    class='members__handlebar'
  )


  //- user
  //- User(
  //-   :propData='userData'
  //-   class='members__user'
  //- )

  //- user
  div(
    class='members__user'
  )
    Avatar(
      :userData='userData'
      class='members__user-avatar'
    )
    p(
      class='members__user-name'
    ) {{ userData.user.displayName }}


  //- actions
  div(class='actions')
    a(class='actions__button')
    a(class='actions__button')
    a(class='actions__button')
    //- more features
    a(
      @click='toggleActions'
      class='members__icon actions__button actions__more'
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



  //- active users list
  div(
    class='active-users'
  )
    h3(class='active-users__title list__title') Members
    ul(
      class='active-users__list'
    )
      li(
        v-for='(item, index) in members'
        :key='"activeUsers" + index'
        class='active-users__item'
      )
        Avatar(
          :userData='item'
          class='active-users__avatar'
        )


  //- //- active conversation members
  //- ul(class='members__list')
  //-   li(
  //-     v-for='(user, index) in members'
  //-     :key='index'
  //-     class='members__item'
  //-   )
  //-     MemberCard(
  //-       :item='user'
  //-       :index='index'
  //-       :activeMemberIndex='activeMemberIndex'
  //-       @selectMember='setActiveMember(index)'
  //-       class='members__card'
  //-     )

</template>


<script>
import { mapGetters, mapMutations, mapActions, mapState } from 'vuex'
import IconActions from '~/assets/svg/icon-actions.svg'
import IconPlus from '~/assets/svg/icon-plus.svg'
import IconBan from '~/assets/svg/icon-ban.svg'
import MemberCard from './MemberCard.vue'
import User from '~comp/User.vue'
import Avatar from '~comp/Avatar.vue'


export default {
  components: {
    MemberCard,
    IconPlus,
    IconActions,
    IconBan,
    User,
    Avatar
  },
  data () {
    return {
      activeMemberIndex: 0,
      showActions: false,
    }
  },
  computed: {
    isActive () {
      console.log('isActive: ', !this.$route.params.id || this.$route.params.id === 'new' ? false : true)
      return !this.$route.params.id || this.$route.params.id === 'new' ? false : true
    },


    userData () {
      const user = this.members[this.activeMemberIndex]

      console.log('activeUser --> ', user)
      return {
        timestamp: '',
        user: {
          profilePicture: user.profilePicture,
          displayName: user.displayName
        }
      }
    },


    ...mapState({
      activeMenu: state => state.messenger.app.activeList
    }),


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
  z-index: 99 // temp
  display: none
  position: relative
  padding: $unit*5
  @extend %flex--column
  background: $white

  &.active
    display: flex


  &__handlebar
    position: relative
    width: $unit*5
    height: $unit*3
    align-self: center
    margin: $unit 0

    &::before,
    &::after
      content: ''
      position: absolute
      top: 50%
      width: 50%
      height: $unit/3
      background: $grey
      border-radius: 4px



    &::before
      left: 0
      transform: translate(2px, -50%) rotate(30deg)

    &::after
      right: 0
      transform: translate(-2px, -50%) rotate(-30deg)


  &__actions-container
    @extend %flex--row-center

  &__user
    @extend %flex
    align-items: center
    margin: $unit*8 0 $unit*8 0

  &__user-avatar
    width: $unit*12

  &__user-name
    margin-left: $unit*4

  &__list

  &__item

  &__icon
    @extend %flex
    width: $unit*2
    height: $unit*2
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



.active-users
  // margin: 0px 0 $unit*6 0


  &__title
    // margin-bottom: 24px
    font-size: 12px
    color: $dark
    text-transform: uppercase


  &__list
    display: grid
    grid-gap: $unit*3
    grid-auto-flow: column
    grid-auto-columns: min-content
    padding: $unit*3 0 $unit*7 0

  &__item
    width: 48px
    height: 48px

  &__avatar
    width: 48px
    height: 48px

.actions
  @extend %flex
  justify-content: center
  margin-bottom: $unit*10

  &__button
    @extend %flex--row-center
    width: $unit*5
    height: $unit*5
    margin-right: $unit*2
    border-radius: 50%
    background: lightblue
    box-shadow: 0px 8px 24px rgba(173, 216, 230, 0.5)

    &:last-child
      margin-right: unset


  &__more
    background: unset
    box-shadow: unset


</style>
