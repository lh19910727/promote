<template>
  <div class="container layoutRow">
    <top-product-item
      v-if="single"
      :item="items[0]"
      :class="'singleBox'"
    />
    <div v-if="double" class="flex1 layoutRow doubleBox">
      <top-product-item
        v-for="(item, index) in items"
        :item="item"
        :key="index"
        :class="'doubleItem'"
      />
    </div>
    <div v-if="tripple" class="flex1 layoutRow trippleBox">
        <top-product-item
          :item="items[0]"
          :class="'trippleItem'"
        />
        <div class="flex1 layoutColumn trippleItem">
          <top-product-item
            v-for="(item, index) in items"
            v-if="index > 0"
            :item="item"
            :key="index"
            :class="'trippleSubItem'"
          />
        </div>
    </div>
  </div>
</template>

<script>
  import topProductItem from './topProductItem'

  export default {
    props: {
      items: {
        type: Array,
        default() {
          return []
        },
      },
    },
    computed: {
      single() {
        return this.items.length === 1
      },
      double() {
        return this.items.length === 2
      },
      tripple() {
        return this.items.length === 3
      },
      more() {
        return this.items.length > 3
      },
    },
    components: {
      topProductItem,
    },
  }

</script>

<style lang="scss">
  @import '~theme/function';
  @import '~theme/flexLayout';
  @import '~theme/colors';
  .container{
    box-sizing: border-box;
    height: rem-calc(240px);
    padding: rem-calc(20px) rem-calc(15px);
    background-color: $white;
    align-items: stretch;
    >div{
      box-sizing: border-box;
    }
  }
  .singleBox{
    padding: rem-calc(10px) 0;
    background-color: $grey-e5;
	  border-radius: rem-calc(3px);
    height: 100%;
  }
  .doubleBox{
    height: 100%;
    .doubleItem{
      padding: rem-calc(10px) 0;
      width: 0;
      height: 100%;
	    border-radius: rem-calc(3px);
      &:first-child{
        margin-right: rem-calc(10px);
      }
    }
  }
  .trippleBox{
    height: 100%;
    .trippleItem{
      height: 100%;
      width: 0;
      &:first-child{
        background-color: $grey-e5;
        padding: rem-calc(10px) 0;
        width: 0;
        height: 100%;
        margin-right: rem-calc(10px);
		    border-radius: rem-calc(3px);
      }
      .trippleSubItem{
        height: 0;
        padding-top: rem-calc(10px);
        background-color: $grey-e5;
		    border-radius: rem-calc(3px);
        &:last-child{
          margin-top: rem-calc(10px);
		      border-radius: rem-calc(3px);
        }
      }
    }
  }
</style>
