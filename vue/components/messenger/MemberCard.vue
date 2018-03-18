<template lang='pug'>
div(
  :style='styles'
  class='card'
)
  div(
    @click='selectMember'
    class='card__avatar'
  )
    img(
      v-lazy='item.profilePicture ? item.profilePicture : ""'
      class='card__img'
    )
  p(
    :class='{ hide: !isActive }'
    class='card__name'
  ) {{ item.displayName }}
  p(
    :class='{ hide: !isActive }'
    class='card__online'
  ) {{ userPresence }}

</template>


<script>
import { mapGetters } from 'vuex'


export default {
  props: {
    item: {
      type: Object,
      required: true
    },
    index: {
      type: Number,
      required: true
    },
    activeMemberIndex: {
      type: Number,
      required: true
    }
  },
  data () {
    return {
      isActive: false
    }
  },
  computed: {
    userPresence () {
      const presence = this.getUserPresence(this.item.uid)
      if (!presence) return ''
      return presence.online ? 'Online' : 'Offline'
    },


    styles () {
      const index = this.index
      const activeIndex = this.activeMemberIndex
      const offset = Math.abs(activeIndex - index)
      let translateX = 0
      let scale = 1
      let styles = {}
      this.isActive = false

      if (offset === 0) {
        translateX = 0
        scale = 1
        this.isActive = true
      }
      else if (offset === 1) {
        styles = { opacity: 0.5 }
        translateX = -56 * (activeIndex - index)
        scale = 0.5
      }
      else if (offset > 1) styles = { opacity: 0, visibility: 'hidden' }

      styles['transform'] = `translateX(${translateX}px) scale(${scale})`

      return styles
    },


    ...mapGetters({
      getUserPresence: 'presence/getUserPresence'
    })
  },
  methods: {
    selectMember () {
      this.$emit('selectMember')
    }
  }
}
</script>


<style lang='sass' scoped>

.card
  @extend %flex--column
  align-items: center
  transition: transform 250ms

  &__avatar
    @extend %avatar

  &__name
    text-align: center
    white-space: nowrap

    &.hide
      visibility: hidden

  &__online
    color: $dark
    font-size: $fs-1

    &.hide
      visibility: hidden

</style>
