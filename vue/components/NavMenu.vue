<template lang='pug'>
div.nav-menu
  ul.nav-menu__list
    li(
      v-for='(item, index) in menuList'
      :key='index'
    ).nav-menu__item
      router-link(
        :to='item.url'
      ).nav-menu__link {{ item.text }}
</template>


<script>
import generalData from '../data/general.json'

export default {
  components: {},
  data () {
    return {
      menuList: []
    }
  },
  methods: {
    setMenuList () {
      const data = generalData
      const list = data.navMenu.menuList
      this.menuList = list
    }
  },
  beforeMount() {
    this.setMenuList()
  }
}
</script>


<style lang='sass'>
.nav-menu

  &__list
    display: flex

  &__item
    margin-right: 0.5rem

    &:last-child
      margin-right: unset

</style>
