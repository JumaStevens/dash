<template lang='pug'>
form(
  @submit.prevent='formSubmit'
  class='form'
)
  //- displayName
  div(class='input-container')
    label(class='label') Username
    input(
      v-model.trim='displayName'
      v-validate='"required|alpha_spaces"'
      placeholder='User21'
      class='input'
    )
  //- bio
  div(class='input-container')
    label(class='label') Bio
    input(
      v-model.trim='bio'
      placeholder='Bio'
      class='input'
    )

  input(
    type='submit'
  )


</template>


<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  data () {
    return {
      displayName: '',
      bio: ''
    }
  },
  computed: {
    ...mapGetters({
      currentUser: 'auth/getCurrentUser'
    })
  },
  methods: {
    async formSubmit () {
      try {
        const valid = await this.$validator.validateAll()

        if (!this.displayName || !valid) throw this.errors

        this.updateProfile({ displayName: this.displayName })
      }
      catch (e) { console.error(e) }
    },


    ...mapActions({
      updateProfile: 'auth/updateProfile'
    })
  },
  mounted () {
    const initUserData = () => {
      this.displayName = this.currentUser.displayName || ''
    }
    initUserData()
  }
}
</script>


<style lang='sass' scoped>
.form
  width: 75%
  max-width: 600px

.input-container
  @extend %flex
  justify-content: space-between
  margin-bottom: $unit*5

.label
  padding: 0 $unit*2 0 0

.input
  padding: .1rem 0
  border-bottom: 1px solid $dark
  background: transparent

</style>
