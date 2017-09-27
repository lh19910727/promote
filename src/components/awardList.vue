<template>
  <div class="awardListContainer">
    <h2>
      <img :src="titleTextImg"  />
    </h2>
    <div class="nameList" ref="marqueeBox">
      <div ref="origin">
        <p
          v-for="(award, idx) in awardList"
          :key="idx"
        >
          {{award.name}}<span>获得{{award.prizeName}}</span>
        </p>
      </div>
      <div ref="clone">
      </div>
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
      line-height: 40.5px;
      font-size: 0;
      img{
        vertical-align: middle;
        margin: 0;
        padding: 0;
        display: inline-block;
        width: 210px;
        border: none;
        outline: none;
      }
    }
    .nameList{
      position: relative;
      height: 120px;
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
        default() {
          return []
        },
      },
    },
    methods: {
      marquee(speed = 10) {
        const marqueeBox = this.$refs.marqueeBox
        const originEle = this.$refs.origin
        const cloneEle = this.$refs.clone
        cloneEle.innerHTML = originEle.innerHTML
        const rolling = () => {
          if (marqueeBox.scrollTop === cloneEle.offsetTop) {
            marqueeBox.scrollTop = 0
          } else {
            marqueeBox.scrollTop += 1
          }
        }
        setInterval(rolling, speed)
      },
    },
    mounted() {
      this.marquee(50)
    },
  }

</script>
