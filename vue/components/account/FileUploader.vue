<template lang='pug'>
div
  img(
    :src='downloadURL'
    class='image'
  )
  input(
    type='file'
    multiple
    accept='image/*'
    @change='detectFiles($event.target.files)'
  )
  div(
    class='progress-bar'
    :style='{ width: progress + '%'}'
  ) {{ progress }} % | {{ downloadURL }}

</template>


<script>
import { storage } from '~/firebase'
import { mapState } from 'vuex'

export default {
  data () {
    return {
      progress: '',
      file: {
        name: ''
      },
      downloadURL: '',
      showProgress: false
    }
  },
  computed: {
    uploadProgress () {
      //const key = this.file.name
      console.log('---> ', progress)
      if (!this.uploadTask[this.file.name]) return
      //return !key || progress[key] ? 100 : progress[key]
      const progress = (snapshot) => snapshot.bytesTransferred / snapshot.totalBytes * 100

      const success = (snapshot) => console.log('snap: ', snapshot)

      const error = (err) => console.error(err)

      this.uploadTask[this.file.name].on('state_changed', snapshot => success(snapshot), err => error(err))
    },


    ...mapState({
      uploadTask: 'media/uploadTask'
    })
  },
  methods: {
    detectFiles (fileList) {
      Array.from(Array(fileList.length).keys()).forEach(x => this.upload(fileList[x]))
    },


    upload (file) {
      console.log('file: ', this)
      this.file = file
      this.$store.dispatch('media/uploadProfilePicture', file)
      this.uploadProgress
    }
  }
}
</script>


<style lang='sass' scoped>

.progress-bar
  margin: 10px 0
  &.width

.image
  width: 500px
  height: auto

</style>
