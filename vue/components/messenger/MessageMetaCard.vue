<template lang='pug'>
router-link(
  :to='{ name: "chat", params: { id: item.id } }'
  class='card'
)
  div.card__avatar
    img(
      v-lazy='user.profilePicture'
      class='card__img'
    )
  p.card__name {{ user.displayName }}
  p.card__text {{ item.lastMessage }}
  p.card__date {{ item.timestamp | formatDate }}

</template>


<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  props: {
    item: {
      type: Object,
      required: true
    }
  },
  computed: {
    user () {
      return this.getUser(this.item.uid)
    },


    ...mapGetters({
      getUser: 'users/getUser'
    })
  },
  methods: {
    ...mapActions({
      fetchUser: 'users/fetchUser'
    })
  },
  created () {
    this.fetchUser(this.item.uid)
  }
}
</script>


<style lang='sass' scoped>

.card
  height: $fs*4
  display: grid
  grid-template-rows: repeat(2, auto)
  grid-template-columns: auto 1fr auto
  grid-gap: $unit/2 $unit
  background: $white
  padding: $unit $unit*2

  &__avatar
    @extend %avatar
    grid-row: 1 / 3
    grid-column: 1 / 2
    width: 48px
    height: 48px

  &__name
    grid-row: 1 / 2
    grid-column: 2 / 3
    font-weight: 900

  &__text
    grid-row: 2 / 3
    grid-column: 2 / 3
    color: $dark
    overflow: hidden
    white-space: nowrap
    text-overflow: ellipsis

  &__date
    grid-row: 1 / 2
    grid-column: 3 / 4

</style>
