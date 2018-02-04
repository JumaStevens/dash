<template lang='pug'>
section.container
  form(
    @submit.prevent='formSubmit'
  )
    label Update displayName
    input(
      v-model='displayName'
      v-validate='"required|alpha_spaces"'
    )
    input(
      type='submit'
    )


</template>


<script>
import { mapActions } from 'vuex'

export default {
  data () {
    return {
      displayName: ''
    }
  },
  methods: {
    async formSubmit () {
      try {
        const valid = await this.$validator.validateAll()

        if (!this.displayName || !valid) throw this.errors

        this.updateProfile({ displayName: this.displayName.trim() })
      }
      catch (e) { console.error(e) }
    },


    ...mapActions({
      updateProfile: 'auth/updateProfile'
    })
  }
}
</script>


<style lang='sass' scoped>


</style>
