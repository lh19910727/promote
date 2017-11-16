<template>
  <div style="position: relative">
    <div class="remainCount">
      剩余抽奖次数：<span>{{remainCount}}</span> 次
    </div>
    <canvas
      class="mainCanvas"
      :id="id"
      :width="canvasWidth"
      :height="canvasHeight"
      :style="{ width: `${canvasWidth / 2}px`, height: `${canvasHeight / 2}px` }"
    >
    </canvas>
  </div>
</template>

<style lang="scss" scoped>
  @import '~theme/colors';
  @import '~theme/function';
  .remainCount{
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    bottom: 8%;
    white-space: nowrap;
    color: $yellow-82;
    font-size: rem-calc(18px);
    span{
      color: $white;
      font-size: rem-calc(36px);
      font-weight: bold;
      font-family: Arial;
    }
  }
  canvas{
    border: none;
    -webkit-tap-highlight-color: transparent;
  }
</style>

<script>
  import isEmpty from 'lodash/isEmpty'
  import forEach from 'lodash/forEach'
  import rem from '@/utils/canvasRem'
  import arrowImgUrl from '@/assets/arrow.png'
  import TextArc from '@/utils/TextArc'

  export default {
    name: 'prizePlate',
    data() {
      return {}
    },
    props: {
      resetPos: {
        type: Boolean,
        default: false,
      },
      remainCount: {
        type: Number,
        default: 0,
      },
      prizeImageList: {
        type: Array,
        default() {
          return []
        },
      },
      result: {
        type: Number,
        default: 0,
      },
      canvasWidth: {
        type: Number,
        default: document.body.clientWidth,
      },
      canvasHeight: {
        type: Number,
        default: document.body.clientHeight,
      },
      id: {
        type: String,
        default: 'prizePlate',
      },
    },
    methods: {
      dottedLine(name, color) {
        const dottedContainer = new createjs.Container()
        dottedContainer.name = name
        // light
        const totalCircle = 11
        for( let i =0; i < totalCircle; i ++) { // eslint-disable-line
          const lightPlate = new createjs.Shape()
          const angle = i * 2 * (Math.PI / totalCircle)
          const x = this.posX + (Math.cos(angle) * this.dottedRadius)
          const y = this.posY + (Math.sin(angle) * this.dottedRadius)
          lightPlate.graphics.beginFill(color)
          lightPlate.graphics.arc(x, y, this.dottedCircleRadius, 0, Math.PI * 2, false)
          lightPlate.graphics.closePath()
          dottedContainer.addChild(lightPlate)
        }
        return dottedContainer
      },
      resetPlate() {
        const prizePlate = this.stage.getChildByName('prizePlate')
        prizePlate.rotation = 0
      },
      animatePlate() {
        this.$emit('onstart')
      },
      // animatePlate() {
      //   const arrowContainer = this.stage.getChildByName('arrowContainer')
      //   const startLabel = arrowContainer.getChildByName('startLabel')
      //   const pauseLabel = arrowContainer.getChildByName('pauseLabel')
      //   const prizePlate = this.stage.getChildByName('prizePlate')
      //   if (this.remainCount <= 0) return
      //   if (startLabel.visible) {
      //     prizePlate.rotation = 0
      //     createjs.Tween.get(prizePlate, {
      //       loop: true,
      //       override: true,
      //     }, true).to({ rotation: 360 }, 1000)
      //     startLabel.visible = false
      //     pauseLabel.visible = true
      //     this.$emit('onstart')
      //   } else {
      //     this.$emit('onend')
      //   }
      // },
      // animatePlate() {
      //   const arrowContainer = this.stage.getChildByName('arrowContainer')
      //   const startLabel = arrowContainer.getChildByName('startLabel')
      //   const pauseLabel = arrowContainer.getChildByName('pauseLabel')
      //   const prizePlate = this.stage.getChildByName('prizePlate')
      //   if (this.remainCount <= 0) return
      //   if (startLabel.visible) {
      //     prizePlate.rotation = 0
      //     createjs.Tween.get(prizePlate, {
      //       loop: true,
      //       override: true,
      //     }, true).to({ rotation: 360 }, 1000)
      //     startLabel.visible = false
      //     pauseLabel.visible = true
      //     this.$emit('onstart')
      //   }
      // },
      endAnimate(val, count) {
        const arrowContainer = this.stage.getChildByName('arrowContainer')
        const startLabel = arrowContainer.getChildByName('startLabel')
        const pauseLabel = arrowContainer.getChildByName('pauseLabel')
        const prizePlate = this.stage.getChildByName('prizePlate')
        startLabel.visible = true
        pauseLabel.visible = false
        const endRotation = ((val + 0.5) * this.sectorAngle * 180) / Math.PI
        createjs.Tween.get(prizePlate, { loop: false, override: true })
          .to({ rotation: ((360 - endRotation) + (360 * count)) }, (1000 * count),
           createjs.Ease.cubicOut)
          .call(() => {
            this.$emit('onend')
          })
      },
      generateLabel(text, name, fontSize, visible) {
        // arrow text
        const arrowText = new createjs.Text(text, `bold ${rem(fontSize)}px Arial`, '#ffffff')
        arrowText.name = name
        arrowText.x = this.posX
        arrowText.y = this.posY + this.arrowTextOffsetY
        arrowText.textAlign = 'center'
        arrowText.textBaseline = 'center'
        arrowText.visible = visible
        return arrowText
      },
      getPrizeLabelFontSize() {
        const len = this.prizeImageList.length
        if (len <= 6) {
          return rem(30)
        }
        if (len > 6 && len < 9) {
          return rem(25)
        }
        return rem(20)
      },
      drawFoundation(stage) {
        // foundation
        const foundationContainer = new createjs.Container()
        const foundation = new createjs.Shape()
        foundation.graphics.moveTo(this.posX, this.foundationTopY)
        foundation.graphics.beginFill('#f15955')
          .lineTo(this.posX - this.foundationXOffset, this.foundationBottomY)
          .lineTo(this.posX + this.foundationXOffset, this.foundationBottomY)
          .lineTo(this.posX, this.foundationTopY)
          .closePath()
        foundation.shadow = new createjs.Shadow('#c6a118', 0, this.innerFoundationStrokeWidth, this.innerFoundationStrokeWidth * 3)
        foundationContainer.addChild(foundation)
        const foundationInner = new createjs.Shape()
        foundationInner.graphics.moveTo(this.posX, this.innerFoundationTopY)
        foundationInner.graphics.setStrokeStyle(this.innerFoundationStrokeWidth)
          .beginStroke('#dd4642')
          .lineTo(this.posX - this.innerFoundationXOffset, this.innerFoundationBottomY)
          .lineTo(this.posX + this.innerFoundationXOffset, this.innerFoundationBottomY)
          .lineTo(this.posX, this.innerFoundationTopY)
          .closePath()
        foundationContainer.addChild(foundationInner)
        stage.addChild(foundationContainer)
      },
      drawBase(stage) {
        const baseContainer = new createjs.Container()
        baseContainer.name = 'baseContainer'
        // base plate
        const basePlate = new createjs.Shape()
        basePlate.graphics.beginFill('#f15955').drawCircle(this.posX, this.posY, this.outerRadius)
        basePlate.shadow = new createjs.Shadow('#dd4642', 0, this.innerFoundationStrokeWidth, 0)
        baseContainer.addChild(basePlate)
        // light
        const dottedCircleLight = this.dottedLine('light', '#fbf08f')
        const dottedCircleShadow = this.dottedLine('shadow', '#f8aca9')
        dottedCircleShadow.x = this.posX
        dottedCircleShadow.y = this.posY
        dottedCircleShadow.regX = this.posX
        dottedCircleShadow.regY = this.posY
        dottedCircleShadow.rotation = 16.36
        createjs.Tween.get(dottedCircleLight, { loop: true })
          .to({ alpha: 0.3 }, 100)
          .to({ alpha: 1 }, 500, createjs.Ease.getPowInOut(2))
        createjs.Tween.get(dottedCircleShadow, { loop: true })
          .to({ alpha: 1 }, 100)
          .to({ alpha: 0.3 }, 500, createjs.Ease.getPowInOut(2))
        createjs.Ticker.setFPS(30)
        createjs.Ticker.addEventListener('tick', stage)
        baseContainer.addChild(dottedCircleLight)
        baseContainer.addChild(dottedCircleShadow)
        stage.addChild(baseContainer)
      },
      drawMiddle(stage) {
        const middleContainer = new createjs.Container()
        middleContainer.name = 'prizePlate'
        const posX = this.posX
        const posY = this.posY
        let cumulativeAngle = -(Math.PI / 2)
        const sectorAngle = this.sectorAngle
        const prizeRadius = this.middleRadius * 0.55
        const prizeImgSize = prizeRadius * 0.6
        forEach(this.prizeImageList, (prize, idx) => {
          const container = new createjs.Container()
          const endAngle = cumulativeAngle + sectorAngle
          // sector base
          const sector = new createjs.Shape()
          sector.graphics.moveTo(posX, posY)
            .beginFill('#ffffff')
          sector.graphics
            .arc(posX, posY, this.middleRadius, cumulativeAngle, endAngle)
            .lineTo(posX, posY)
          sector.graphics.closePath()
          container.addChild(sector)
          // sector subBase
          const subSector = new createjs.Shape()
          subSector.graphics
            .moveTo(posX, posY)
            .beginFill(idx % 2 === 0 ? '#ffa481' : '#f5875c')
          subSector.graphics
            .arc(posX, posY, this.innerRadius, cumulativeAngle, cumulativeAngle + sectorAngle)
            .lineTo(posX, posY)
          subSector.graphics.closePath()
          container.addChild(subSector)
          // sector line
          const endPointX = posX + (this.middleRadius * Math.cos(endAngle))
          const endPointY = posY + (this.middleRadius * Math.sin(endAngle))
          const sectorLine = new createjs.Shape()
          sectorLine.graphics
            .setStrokeStyle(1.5)
            .beginStroke('rgb(232, 126, 86)')
            .moveTo(posX, posY)
            .lineTo(endPointX, endPointY)
          sectorLine.shadow = new createjs.Shadow('rgba(255, 255, 255, 0.23)', -2, 0, 0)
          container.addChild(sectorLine)
          // sector base border
          const sectorBoxArcLine = new createjs.Shape()
          sectorBoxArcLine.graphics
            .setStrokeStyle(this.middleBorderWidth)
            .beginStroke('#fcd958')
            .drawCircle(posX, posY, this.middleRadius)
          container.addChild(sectorBoxArcLine)
          // label
          const labelRadius = this.middleRadius * 0.42
          const maxLength = (labelRadius + (this.getPrizeLabelFontSize() / 2)) * sectorAngle
          const label = new TextArc(prize.title, `bold ${this.getPrizeLabelFontSize()}px Arial`, '#f15955', labelRadius, maxLength)
          const labelAngle = cumulativeAngle + (sectorAngle / 2.0)
          const labelX = posX + (labelRadius * Math.cos(labelAngle))
          const labelY = posY + (labelRadius * Math.sin(labelAngle))
          label.x = labelX
          label.y = labelY
          label.textAlign = 'center'
          label.rotation = ((labelAngle * 180) / Math.PI) + 90
          container.addChild(label)
          // image
          const prizeImage = prize.image
          const prizeBitMapImg = new createjs.Bitmap(prizeImage)
          const prizeAngle = cumulativeAngle + (sectorAngle / 2.0)
          const prizeX = posX + (prizeRadius * Math.cos(prizeAngle))
          const prizeY = posY + (prizeRadius * Math.sin(prizeAngle))
          prizeBitMapImg.scaleX = prizeImgSize / prizeImage.width
          prizeBitMapImg.scaleY = prizeImgSize / prizeImage.height
          prizeBitMapImg.x = prizeX
          prizeBitMapImg.y = prizeY
          prizeBitMapImg.regX = prizeImage.width / 2
          prizeBitMapImg.regY = prizeImage.height / 2
          prizeBitMapImg.rotation = ((prizeAngle * 180) / Math.PI) + 90
          container.addChild(prizeBitMapImg)
          cumulativeAngle += sectorAngle
          middleContainer.addChild(container)
        })
        middleContainer.x = this.posX
        middleContainer.y = this.posY
        middleContainer.regX = this.posX
        middleContainer.regY = this.posY
        stage.addChild(middleContainer)
      },
      drawArrow(stage) {
        const arrowContainer = new createjs.Container()
        arrowContainer.name = 'arrowContainer'
        // arrow
        const arrow = new createjs.Bitmap(arrowImgUrl)
        arrow.name = 'arrow'
        arrow.scaleX = this.arrowWidth / 210
        arrow.scaleY = this.arrowHeight / 235
        arrow.x = this.posX - (this.arrowWidth / 2)
        arrow.y = this.posY - (this.arrowHeight / 2) - this.arrowOffsetY
        arrowContainer.addChild(arrow)
        // start arrow text
        const startLabel = this.generateLabel('开始', 'startLabel', 40, true)
        const pauseLabel = this.generateLabel('结束', 'pauseLabel', 40, false)
        arrowContainer.addChild(startLabel)
        arrowContainer.addChild(pauseLabel)
        arrowContainer.shadow = new createjs.Shadow('#ffffff', 0, 0, 100)
        // bind click event
        arrowContainer.addEventListener('click', this.animatePlate)
        stage.addChild(arrowContainer)
      },
      disableLottery() {
        const arrowInstance = this.stage.getChildByName('arrowContainer')
        arrowInstance.filters = [
          new createjs.BlurFilter(2, 2, 2),
          new createjs.ColorMatrixFilter(new createjs.ColorMatrix(30, 0, -100, 0)),
        ]
        arrowInstance.cache(0, 0, this.canvasWidth, this.canvasHeight)
      },
    },
    mounted() {
      const prizeCount = this.prizeImageList.length || 1
      this.posX = this.canvasWidth / 2
      this.sectorAngle = (Math.PI * 2) / prizeCount
      this.outerRadius = (this.canvasWidth - rem(100)) / 2
      this.dottedRadius = (311 / 325) * this.outerRadius
      this.dottedCircleRadius = (13 / 650) * this.outerRadius
      this.posY = this.outerRadius + (this.canvasWidth * 0.53)
      this.middleRadius = this.outerRadius * (289 / 325)
      this.middleBorderWidth = this.outerRadius * (8 / 325)
      this.innerRadius = this.outerRadius * (218 / 325)
      this.arrowHeight = this.outerRadius * 1.5 * (47 / 130)
      this.arrowWidth = this.outerRadius * 1.5 * (21 / 65)
      this.arrowOffsetY = (this.outerRadius * 1.5 * (5 / 130)) / 2
      this.arrowTextOffsetY = this.outerRadius * 1.5 * (9 / 325)
      this.foundationTopY = this.posY - this.outerRadius
      this.foundationBottomY = this.posY + (this.outerRadius * (1 + (22 / 65)))
      this.foundationXOffset = this.outerRadius * (93 / 130)
      this.innerFoundationTopY = this.foundationTopY + (this.outerRadius * (4 / 65))
      this.innerFoundationBottomY = this.foundationBottomY - (this.outerRadius * (15 / 325))
      this.innerFoundationXOffset = this.outerRadius * (208 / 325)
      this.innerFoundationStrokeWidth = this.outerRadius * (8 / 325)
      if (!this.stage) {
        this.stage = new createjs.Stage(this.id)
        if (!isEmpty(this.prizeImageList)) {
          this.drawFoundation(this.stage)
          this.drawBase(this.stage)
          this.drawMiddle(this.stage)
          this.drawArrow(this.stage)
        }
        if (this.remainCount === 0) {
          this.disableLottery()
        }
      }
    },
    watch: {
      resetPos(val) {
        if (val === true) {
          this.resetPlate()
        }
      },
      remainCount(val) {
        if (val <= 0) {
          this.disableLottery()
        }
      },
      result(newVal) {
        if (newVal >= 0) {
          this.endAnimate(newVal, 6)
        }
      },
    },
  }

</script>
