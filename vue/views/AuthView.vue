<template lang='pug'>
main.auth
  form(
    @submit.prevent=''
  ).auth__form
    // email
    input(
      v-model='form.email'
      type='email'
      name='email'
      v-validate='"required|email"'
      key='auth-email'
      placeholder='Email'
      required
    ).auth__input
    // password
    input(
      v-model='form.password'
      type='password'
      placeholder='Password'
      required
    ).auth__input
    // login
    input(
      type='submit'
      value='Login'
      @click='signInWithEmailAndPassword'
    ).auth__submit
    // logout
    input(
      type='button'
      value='Logout'
      @click='signOut()'
    ).auth__submit
    // create user
    input(
      type='submit'
      value='Create Account'
      @click='createUserWithEmailAndPassword'
    ).auth__submit
</template>


<script>

export default {
  data () {
    return {
      form: {
        email: '',
        password: ''
      }
    }
  },
  methods: {
    async signInWithEmailAndPassword () {
      try {
        const valid = await this.$validator.validateAll()
        if (!valid) throw this.errors // $validator provided object
        this.$store.dispatch('auth/signInWithEmailAndPassword', this.form)
      }
      catch (e) { console.error(e) }
    },
    async createUserWithEmailAndPassword () {
      try {
        const valid = await this.$validator.validateAll()
        if (!valid) throw this.errors // $validator provided object
        this.$store.dispatch('auth/createUserWithEmailAndPassword', this.form)
      }
      catch (e) { console.error(e) }
    },
    signOut () {
      this.$store.dispatch('auth/signOut')
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
