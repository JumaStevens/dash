<template lang='pug'>
//- search form
form(
  :class='{ active: isFocus }'
  class='search'
)
  //- search icon
  a(
    @click='isFocus ? blur() : null'
    class='search__icon'
  )
    IconSearch(class='search__svg')

  //- input field
  input(
    v-model='search'
    @focus='focus()'
    @blur='blur()'
    ref='input'
    placeholder='Search'
    class='search__input'
  )

  //- clear icon
  a(
    v-show='isFocus && search.length'
    @click='clear'
    class='search__clear'
  )
    IconCancel(class='search__svg search__svg--clear')

  //- cancel
  a(
    @click='blur'
    class='search__cancel'
  ) Cancel

</template>


<script>
import IconSearch from '~/assets/svg/icon-search.svg'
import IconCancel from '~/assets/svg/icon-cancel.svg'

export default {
  components: {
    IconSearch,
    IconCancel
  },
  props: {},
  data () {
    return {
      search: '',
      isFocus: false
    }
  },
  computed: {},
  watch: {
    search () {
      console.log('watchSearch: ', this.search)
    }
  },
  methods: {
    focus () {
      console.log('focus')
      this.$refs.input.focus()
      this.isFocus = true
    },

    blur () {
      console.log('blur')
      this.$refs.input.blur()
      this.isFocus = false
    },

    clear () {
      console.log('clear')
      this.search = ''
      this.focus()
    },

    toggleFocus () {
      this.isFocus = !this.isFocus
      console.log('isFocus: ', this.isFocus)
    }
  }
}
</script>


<style lang='sass' scoped>

.search
  display: grid
  grid-template-rows: $unit*4
  grid-template-columns: auto 1fr auto auto
  align-items: stretch
  border-top-left-radius: $unit/2
  border-bottom-left-radius: $unit/2
  border-radius: $unit/2
  background: rgba(239, 239, 239, 1)
  transition: background-color 25ms 25ms

  &::before
    content: ''
    grid-row: 1 / 2
    grid-column: 1 / 4
    border-radius: $unit/2
    background: rgba(239, 239, 239, 1)
    transition: background-color 0ms 100ms

  &::after
    content: ''
    position: relative
    z-index: 4
    grid-row: 1 / 2
    grid-column: 4 / 5
    border-top-right-radius: $unit/2
    border-bottom-right-radius: $unit/2
    background: rgba(239, 239, 239, 1)
    transition: transform 100ms



  &__icon
    @extend %flex--row-center
    position: relative
    z-index: 5
    grid-row: 1 / -1
    grid-column: 1 / 2
    align-self: stretch
    width: $unit*4

  &__input
    @extend %flex--row-center
    position: relative
    z-index: 5
    grid-row: 1 / -1
    grid-column: 2 / 3
    width: 100%
    font-size: $fs
    color: $dark
    background: transparent

    &::placeholder
      color: $dark

  &__clear
    @extend %flex--row-center
    position: relative
    z-index: 5
    grid-row: 1 / -1
    grid-column: 3 / 4
    padding: $unit

  &__cancel
    @extend %flex--row-center
    position: relative
    z-index: 3
    grid-row: 1 / -1
    grid-column: 4 / -1
    padding: $unit
    background: transparent
    color: #3897f0

  &__svg--clear
    width: 12px
    height: 12px
    padding: 2px
    border-radius: 50%
    background: $dark
    fill: rgba(239, 239, 239, 1)


  &.active
    background: transparent

    &::before

    &::after
      transform: translateX(-100%)


</style>
