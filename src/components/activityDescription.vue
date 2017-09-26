<template>
  <div class="activityContainer">
    <h2>
      <div class="line"></div>
      <span>活动说明</span>
    </h2>
    <div class="descriptionList">
      <p
        v-for="(description, idx) in descriptionList"
        :key="idx"
      >
        {{idx + 1}}. {{description}}
      </p>
    </div>
  </div>
</template>

<style lang="scss" scoped>
  @import '~theme/colors';
  .activityContainer{
    padding: 25px;
    h2{
      position: relative;
      height: 20px;
      line-height: 20px;
      span{
        display: block;
        position: absolute;
        padding: 0 10px;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        color: $primary-red;
        background: $yellow-52;
      }
      &:before,&:after{
        content: '';
        display:block;
        position: absolute;
        top: 50%;
        transform: translate(0, -50%);
        width: 4px;
        height: 4px;
        border-radius: 2px;
        background-color: $primary-red;
      }
      &:before{
        left: 0;
      }
      &:after{
        right: 0;
      }
      .line{
        position: absolute;
        width: 100%;
        height: 1px;
        background-color: $primary-red;
        top: 50%;
        transform: translateY(-50%);
      }

    }
    .descriptionList{
      padding-top: 10px;
      border-top: none;
      overflow: hidden;
      p{
        margin-bottom: 10px;
        font-size: 15px;
        text-align: left;
        line-height: 1.6;
        color: #48453c;
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
      descriptionList: {
        type: Array,
        default: [],
      },
    },
  }

</script>
