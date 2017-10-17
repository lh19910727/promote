<template>
  <div class="activityContainer">
    <h2>
      <div class="line"></div>
      <img :src="descriptionImg" />
    </h2>
    <div class="descriptionList">
      <p>
        {{description}}
      </p>
    </div>
  </div>
</template>

<style lang="scss" scoped>
  @import '~theme/colors';
  @import '~theme/function';
  .activityContainer{
    padding: rem-calc(25px);
    h2{
      position: relative;
      height: 20px;
      line-height: 20px;
      img{
        display: block;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: rem-calc(85px);
        background-color: $yellow-52;
        padding: 0 rem-calc(10px);
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
      padding-top: rem-calc(20px);
      border-top: none;
      overflow: hidden;
      p{
        margin-bottom: rem-calc(10px);
        font-size: rem-calc(15px);
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
  import descriptionImg from '@/assets/description.png'

  export default {
    name: 'awardList',
    data() {
      return {
        titleTextImg,
        descriptionImg,
      }
    },
    props: {
      description: {
        type: String,
        default: null,
      },
    },
  }

</script>
