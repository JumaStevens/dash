<template lang='pug'>
//- search form
form(
  class='controller__search-form search-form'
)
  //- search icon
  a(
    @click='toggleSearchFocus'
    class='search-form__icon controller__icon'
  )
    IconSearch.controller__svg

  //- input field
  input(
    v-model='search'
    ref='searchInput'
    placeholder='Search'
    class='search-form__input'
  )

  //- clear icon
  a(
    v-show='search.length'
    @click='clearSearch'
    class='search-form__icon search-form__clear controller__icon'
  )
    IconCancel(class='search-form__svg--clear controller__svg')

</template>


<script>
import IconSearch from '~/assets/svg/icon-search.svg'
import IconCancel from '~/assets/svg/icon-cancel.svg'

export default {
  components: {
    IconSearch,
    IconCancel
  },
  props: {
    SearchData: {
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

.search-form
  @extend %flex
  grid-row: 2 / 3
  grid-column: 1 / -1
  height: $unit*4
  align-items: stretch
  border-radius: $unit
  background: rgba(239, 239, 239, 1)

  &__icon
    height: unset

  &__input
    width: 100%
    font-size: $fs
    color: $dark
    background: transparent

    &::placeholder
      color: $dark

  &__svg--clear
    width: 12px
    height: 12px
    padding: 2px
    border-radius: 50%
    background: $dark
    fill: rgba(239, 239, 239, 1)


</style>
