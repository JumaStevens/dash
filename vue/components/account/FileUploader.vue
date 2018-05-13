<template lang='pug'>
div(class='profile-picture')
  //- user profile
  Avatar(
    :userData='currentUser'
    class='avatar'
  )
  a(
    @click='submit'
    class='avatar__link'
  ) Change Profile Photo

  input(
    @change='detectFiles($event.target.files)'
    ref='fileInput'
    type='file'
    multiple
    accept='image/*'
    class='input'
  )

  div(
    :style='{ transform: "translateX(" + uploadProgress + "%)" }'
    class='progress-bar'
  )

</template>


<script>
import { database, storage } from '~/firebase'
import { mapActions, mapGetters } from 'vuex'
import Avatar from '~comp/Avatar.vue'

export default {
  components: {
    Avatar
  },
  props: {
    configData: {
      type: Object,
      default () {
        return {
          url: 'users'
        }
      }
    }
  },
  data  () {
    return {
      uploadProgress: -100,
      uploadTask: '',
      downloadURL: ''
    }
  },
  computed: {
    ...mapGetters({
      currentUser: 'auth/getCurrentUser'
    })
  },
  methods: {
    submit () {
      const fileInput = this.$refs.fileInput
      fileInput.click()
    },

    detectFiles (fileList) {
      Array.from(Array(fileList.length).keys()).forEach(x => this.upload(fileList[x]))
    },


    upload (file) {
      const key = database.ref().push().key
      const url = `${this.configData.url}/${this.currentUser.uid}/${key}`

      this.uploadTask = storage.ref(url).put(file);
      console.log('key: ', file)

      const success = (snapshot) => {
        this.uploadTask.snapshot.ref.getDownloadURL().then(downloadURL => {
          this.downloadURL = downloadURL
          console.log('this: ', this.downloadURL)
          this.updateProfile({ photoURL: this.downloadURL })
          this.$emit('url', this.downloadURL)
        }).catch(err => console.error(err))

      }

      const error = (err) => console.error(err)

      this.uploadTask.then(snapshot => success(snapshot), err => error(err))
    },


    ...mapActions({
      updateProfile: 'auth/updateProfile'
    })
  },
  watch: {
    uploadTask: function() {
      const success = (snapshot) => this.uploadProgress = Math.floor(snapshot.bytesTransferred / snapshot.totalBytes * 100 - 100)

      const error = (err) => console.error(err)

      this.uploadTask.on('state_changed', snapshot => success(snapshot), err => error(err))
    }
  }
}
</script>


<style lang='sass' scoped>

.profile-picture
  @extend %flex--column-center


.avatar
  width: $unit*12
  height: $unit*12
  margin-top: $unit*5

  &__link
    margin: $unit*2 0 $unit*5 0
    color: #3897f0


.input
  display: none


.progress-bar
  display: none
  margin: 10px 0
  transition: transform 150ms
  background: $black
  width: 100%
  height: $unit / 4
  transform: translateX(-100%)

</style>
