<template lang='pug'>
main.auth
  form(
    @submit.prevent=''
  ).auth__form
    input(
      v-model='email'
      type='email'
      name='email'
      v-validate='"required|email"'
      key='auth-email'
      placeholder='Email'
      required
    ).auth__input
    input(
      v-model='password'
      type='password'
      placeholder='Password'
      required
    ).auth__input
    input(
      type='submit'
      value='Login'
      @click='submitForm("signIn")'
    ).auth__submit
    input(
      type='submit'
      value='Create Account'
      @click='submitForm("createUser")'
    ).auth__submit
</template>


<script>
import firebaseAuth from '../mixins/firebaseAuth'

export default {
  mixins: [
    firebaseAuth
  ],
  data () {
    return {
      form: {
        email: '',
        password: ''
      }
    }
  },
  methods: {
    async submitForm (type) {
      try {
        await this.validateForm()

        if (type === 'signIn') {
          await this.signIn(this.form)
        }

        else if (type === 'createUser') {
          await !this.isEmailTaken(this.form.email) ? await this.createUser(this.form) : await this.signOut()
        }

      }
      catch (e) {
        console.log('submitForm error: ', e)
      }
    },
    async validateForm () {
      try {
        return await this.$validator.validateAll()
      }
      catch (e) {
        console.log('validateForm error: ', e)
      }
    }
  }
}
</script>

<style lang='sass' scoped>
@import '../assets/sass/main.sass'

.auth
  background: $pri-cl
  display: flex
  justify-content: center
  align-items: center

  &__form
    display: grid
    grid-template-rows: repeat(3, auto)
    max-width: 14rem
    min-width: 8rem
    width: 25vmax

  &__input
    grid-row: 1 / 2
    grid-column: 1 / 3
    width: 100%
    padding: .1rem 0
    margin-bottom: 2rem
    border-bottom: 1px solid $dark
    background: $pri-cl
    &:nth-child(2)
      grid-row: 2 / 3

  &__submit
    grid-row: 3 / 4
    justify-self: center
    padding: .15rem 1rem
    border-radius: 2rem
    border: 1px solid $black
    background: transparent

    &:nth-child(2)
      grid-row: 3 / 4

</style>
