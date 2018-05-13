<template lang='pug'>
main(class='')

  header(class='header')

    //- back
    router-link(
      :to='{ name: "chat" }'
      class='header__icon header__back'
    )
      IconChevron(class='header__svg header__svg--primary')

    //- title
    p(class='header__title') Edit Profile

    //- done
    a(
      @click=''
      class='header__icon header__done'
    ) Done

  div(class='account')
    //- user profile
    file-uploader

    //- displayName
    profile-form

    //- logout
    a(
      @click='signOut()'
      class='logout'
    ) Log Out

</template>


<script>
import FileUploader from './FileUploader.vue'
import ProfileForm from './ProfileForm.vue'
import IconChevron from '~/assets/svg/icon-chevron.svg'
import { mapActions, mapGetters } from 'vuex'


export default {
  components: {
    FileUploader,
    ProfileForm,
    IconChevron
  },
  data () {
    return {

    }
  },
  computed: {
    ...mapGetters({
      displayName: 'auth/getCurrentUserDisplayName'
    })
  },
  methods: {
    ...mapActions({
      signOut: 'auth/signOut'
    })
  }
}
</script>


<style lang='sass' scoped>

.header
  position: relative
  z-index: 50
  width: 100%
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

  &__back
    grid-row: 1 / 2
    grid-column: 1 / 2
    transform: rotate(-90deg)

  &__title
    grid-row: 1 / 2
    grid-column: 1 / -1
    margin: 0 auto

  &__done
    @extend %flex--row-center
    grid-row: 1 / 2
    grid-column: 3 / -1


.account
  display: flex
  flex-direction: column
  align-items: center


.logout
  color: #3897f0

</style>
