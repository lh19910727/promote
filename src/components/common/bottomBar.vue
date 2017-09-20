<template>
  <tabbar :class="{ bottomBar: true }">
    <tabbar-item
      v-for="(item, idx) in items"
      :key="idx"
      icon-class="custom-icon"
      :selected="idx === activeIndex"
      :link="{ name: item.routeName }"
    >
      <svg :class="{ 'menu-icon': true, active: idx === activeIndex}" slot="icon">
        <use :xlink:href="`#${item.svgIcon.id}`"></use>
      </svg>
      <span slot="label">{{item.label}}</span>
    </tabbar-item>
  </tabbar>
</template>

<style lang="scss">
  @import "~theme/function";
  @import "~theme/colors";
  .weui-tabbar.bottomBar{
    position: relative;
  }
  .custom-icon{
    width: rem-calc(24px)!important;
    height: rem-calc(24px)!important;
  }
  .menu-icon{
    width: 100%;
    height: 100%;
    fill: $grey-99;
    &.active{
      fill: $primay-orange;
    }
  }
</style>

<script>
  import findIndex from 'lodash/findIndex'

  import { Tabbar, TabbarItem } from 'vux'
  import HomeIcon from '@/assets/icons/home.svg'
  import FoundIcon from '@/assets/icons/found.svg'
  import ProductIcon from '@/assets/icons/product.svg'
  import MyIcon from '@/assets/icons/my.svg'

  export default {
    name: 'bottomBar',
    components: {
      Tabbar,
      TabbarItem,
    },
    data() {
      return {
        items: [{
          label: '首页',
          svgIcon: HomeIcon,
          routeName: 'main',
        }, {
          label: '产品',
          svgIcon: ProductIcon,
          routeName: 'products',
        }, {
          label: '发现',
          svgIcon: FoundIcon,
          routeName: 'found',
        }, {
          label: '我的',
          svgIcon: MyIcon,
          routeName: 'mine',
        }],
      }
    },
    methods: {
      onItemClick(index) {
        this.activeIndex = index
      },
    },
    computed: {
      activeIndex() {
        const { name } = this.$route
        return findIndex(this.items, { routeName: name })
      },
    },
  }
</script>
