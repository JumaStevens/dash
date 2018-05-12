<template lang='pug'>
main.auth
  form(
    @submit.prevent=''
  ).auth__form

    //- email
    input(
      v-model='form.email'
      type='email'
      name='email'
      v-validate='"required|email"'
      key='auth-email'
      placeholder='Email'
      required
    ).auth__input

    //- password
    input(
      v-model='form.password'
      type='password'
      placeholder='Password'
      required
    ).auth__input

    //- login
    input(
      class='auth__submit auth__signin'
      type='submit'
      value='Login'
      @click='signInWithEmailAndPassword'
    )

    //- create user
    input(
      class='auth__submit auth__signup'
      type='submit'
      value='+ create account'
      @click='createUserWithEmailAndPassword'
    )
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
    signInWithEmailAndPassword () {
      try {
        this.$validator.validateAll()
        if (this.errors.any()) throw this.errors // $validator provided object
        this.$store.dispatch('auth/signInWithEmailAndPassword', this.form)
      }
      catch (e) { console.error(e) }
    },
    createUserWithEmailAndPassword () {
      try {
        this.$validator.validateAll()
        if (this.errors.any()) throw this.errors // $validator provided object
        this.$store.dispatch('auth/createUserWithEmailAndPassword', this.form)
      }
      catch (e) { console.error(e) }
    }
  }
}
</script>

<style lang='sass' scoped>

.auth
  background: $white
  display: flex
  justify-content: center
  align-items: center

  &__form
    @extend %flex--column
    justify-content: center
    max-width: 14rem
    min-width: 8rem
    width: 25vmax

  &__input
    padding: .1rem 0
    margin-bottom: 2rem
    border-bottom: 1px solid $dark
    background: transparent

    &:nth-child(2)
      margin-bottom: 1rem

  &__submit


  &__signin
    width: min-content
    background: transparent


  &__signup
    margin: $unit*5 0
    padding: $unit*2
    border-radius: $unit/2
    background: rgba(46, 54, 63, 1)
    color: white
    box-shadow: 0px 8px 24px rgba(34, 34, 34, 0.4)

</style>
