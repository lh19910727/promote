<template>
  <div class="awardListContainer">
    <h2>
      <img :src="titleTextImg"  />
    </h2>
    <div class="nameList">
      <p
        v-for="(award, idx) in awardList"
        :key="idx"
      >
        {{award.name}}<span>获得{{award.prizeName}}</span>
      </p>
    </div>
  </div>
</template>

<style lang="scss">
  @import '~theme/colors';
  .awardListContainer{
    padding: 0 25px;
    h2{
      height: 40.5px;
      background-color: $primary-red;
      border: solid 1px $primary-red;
      text-align: center;
      img{
        vertical-align: middle;
        display: inline-block;
        width: 210px;
        border: none;
        outline: none;
      }
    }
    .nameList{
      height: 120px;
      padding-top: 10px;
      background-color: $yellow-82;
      border: 1px dotted $primary-red;
      border-top: none;
      overflow: hidden;
      p{
        font-size: 15px;
        text-align: center;
        line-height: 1.6;
        color: #48453c;
        white-space: nowrap;
        span{
          color: #f15955;
        }
      }
    }
  }
</style>

<script>
  import titleTextImg from '@/assets/awardText.png'

  export default {
    name: 'awardList',
    data() {
      return {
        titleTextImg,
      }
    },
    props: {
      awardList: {
        type: Array,
        default: [],
      },
    },
  }

</script>
