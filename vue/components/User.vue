<template lang='pug'>
div(class='user')

  //- user avatar
  Avatar(
    :userData='propData'
    class='user__avatar'
  )

  //- user meta
  div(class='user__meta')
    p(class='user__name') {{ propData.user.displayName }}
    p(class='user__timestamp') {{ propData.timestamp | formatDate }}

</template>


<script>
import Avatar from '~comp/Avatar.vue'

export default {
  components: {
    Avatar
  },
  props: {
    propData: {
      type: Object,
      required: true
    }
  },
  data () {
    return {}
  },
  computed: {},
  methods: {}
}
</script>


<style lang='sass' scoped>
.user
  display: flex

  &__avatar
    width: 40px
    height: 40px

  &__meta
    @extend %flex--column
    justify-content: center
    margin-left: $unit*2

  &__name
    white-space: nowrap
    text-overflow: ellipsis

  &__timestamp
    color: $dark
    font-size: 12px
    text-transform: uppercase

</style>
