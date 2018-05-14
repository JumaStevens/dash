<template lang='pug'>
main.auth

  header(class='header')
    h1(class='title') DASH
    p(class='copy') Simply connect


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

    div(class='auth__inner')

      //- login
      input(
        class='auth__submit auth__signin'
        type='submit'
        value='Login'
        @click='signInWithEmailAndPassword'
      )

      //- forgot password
      input(
        class='auth__submit auth__forgot'
        type='submit'
        value='Forgot password?'
        @click=''
      )



    //- create user
    input(
      class='auth__submit auth__signup'
      type='submit'
      value='Signup'
      @click='createUserWithEmailAndPassword'
    )
</template>


<script>
import { mapGetters } from 'vuex'
import firebase from '~/firebase'

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
        this.$router.replace({ name: 'index' })
      }
      catch (e) { console.error(e) }
    },
    createUserWithEmailAndPassword () {
      try {
        this.$validator.validateAll()
        if (this.errors.any()) throw this.errors // $validator provided object
        this.$store.dispatch('auth/createUserWithEmailAndPassword', this.form)
        this.$router.replace({ name: 'index' })
      }
      catch (e) { console.error(e) }
    }
  },
  beforeRouteEnter (to, from, next) {
    const currentUser = firebase.auth().currentUser
    currentUser ? next({ name: 'index' }) : next()
  }
}
</script>

<style lang='sass' scoped>
.header
  @extend %flex--column-center
  width: 75%
  max-width: 600px
  align-items: unset
  margin: $unit*5 0

.title
  font-size: $fs2
  color: rgba(46, 54, 63, 1)
  line-height: 1

.copy
  color: rgba(46, 54, 63, 1)
  padding-left: .25rem
  font-size: 12px

.auth
  display: grid
  grid-template-rows: 1.5fr 3fr
  justify-items: center
  margin-top: $unit*2
  background: $white

  &__form
    @extend %flex--column
    width: 75%
    max-width: 600px
    justify-content: center

  &__input
    padding: .1rem 0
    margin-bottom: $unit*6
    border-bottom: 1px solid $dark
    background: transparent

    &:nth-child(2)
      margin-bottom: $unit*4

  &__inner
    @extend %flex
    justify-content: space-between

  &__submit
    width: min-content
    background: transparent
    color: rgba(46, 54, 63, 1)

  &__signin

  &__forgot
    margin-left: auto

  &__signup
    width: unset
    margin: $unit*6 0
    padding: $unit*2
    border-radius: $unit/2
    background: rgba(46, 54, 63, 1)
    box-shadow: 0px 8px 24px rgba(34, 34, 34, 0.4)
    color: $white

</style>
