<template>
  <canvas
    id="mainCanvas"
    :width="canvasWidth"
    :height="canvasHeight"
  >
  </canvas>
</template>

<script>

  import map from 'lodash/map'
  import forEach from 'lodash/forEach'
  import bgImgUrl from '@/assets/bg.png'
  import arrowImgUrl from '@/assets/arrow.png'
  import { preloadImage } from '@/utils/imageUtil'
  import prizeList from '@/constants/prizeData'
  import TextArc from '@/utils/TextArc'

  export default {
    name: 'main',
    data() {
      return {
        isEyeOpen: true,
        canvasWidth: document.body.clientWidth,
        canvasHeight: document.body.clientHeight,
      }
    },
    methods: {
      dottedLine(radius, name, color) {
        const dottedContainer = new createjs.Container()
        dottedContainer.name = name
        // light
        const totalCircle = 11
        const dotRadius = radius - 7
        for( let i =0; i < totalCircle; i ++) { // eslint-disable-line
          const lightPlate = new createjs.Shape()
          const angle = i * 2 * (Math.PI / totalCircle)
          const x = this.posX + (Math.cos(angle) * dotRadius)
          const y = this.posY + (Math.sin(angle) * dotRadius)
          lightPlate.graphics.beginFill(color)
          lightPlate.graphics.arc(x, y, 3.25, 0, Math.PI * 2, false)
          lightPlate.graphics.closePath()
          dottedContainer.addChild(lightPlate)
        }
        return dottedContainer
      },
      getImageList() {
        return [bgImgUrl, arrowImgUrl].concat(map(prizeList, prize => prize.icon))
      },
      doAnimate(event) {
        const prizePlate = this.stage.getChildByName('prizePlate')
        prizePlate.rotation += (event.delta / 500) * 360
        this.stage.update()
      },
      animatePlate() {
        const arrowContainer = this.stage.getChildByName('arrowContainer')
        const startLabel = arrowContainer.getChildByName('startLabel')
        const pauseLabel = arrowContainer.getChildByName('pauseLabel')
        if (startLabel.visible) {
          createjs.Ticker.addEventListener('tick', this.doAnimate)
          createjs.Ticker.setFPS(30)
          startLabel.visible = false
          pauseLabel.visible = true
        } else {
          startLabel.visible = true
          pauseLabel.visible = false
          createjs.Ticker.removeEventListener('tick', this.doAnimate)
          const prizePlate = this.stage.getChildByName('prizePlate')
          // 随机抽中一个
          prizePlate.rotation = ((Math.floor(prizeList.length * Math.random()) + 0.5)
            * this.sectorAngle * 180) / Math.PI
          this.stage.update()
        }
      },
      generateLabel(text, name, visible) {
        // arrow text
        const arrowText = new createjs.Text(text, '18px Arial', '#ffffff')
        arrowText.name = name
        arrowText.x = this.posX
        arrowText.y = this.posY + 10
        arrowText.textAlign = 'center'
        arrowText.textBaseline = 'bottom'
        arrowText.visible = visible
        return arrowText
      },
      drawFoundation(stage) {
        // foundation
        const foundationContainer = new createjs.Container()
        const foundation = new createjs.Shape()
        const bottomY = this.posY + 217.5
        const leftBottomX = this.posX - 115.5
        const rightBottomX = this.posX + 115.5
        foundation.graphics.moveTo(this.posX, this.posY - 50)
        foundation.graphics.beginFill('#f15955')
          .lineTo(leftBottomX, bottomY)
          .lineTo(rightBottomX, bottomY)
          .lineTo(this.posX, this.posY)
          .closePath()
        foundationContainer.addChild(foundation)
        const foundationInner = new createjs.Shape()
        foundationInner.graphics.moveTo(this.posX, this.posY + 10)
        foundationInner.graphics.setStrokeStyle(4)
          .beginStroke('#dd4642')
          .lineTo(leftBottomX + 14, bottomY - 7)
          .lineTo(rightBottomX - 14, bottomY - 7)
          .lineTo(this.posX, this.posY + 10)
          .closePath()
        foundationContainer.addChild(foundationInner)
        const fText = new createjs.Text('剩余抽奖次数：3 次', '16px Arial', '#fcd958')
        fText.x = this.posX
        fText.y = bottomY - 17
        fText.textBaseline = 'center'
        const bounds = fText.getBounds()
        fText.regX = bounds.width / 2
        fText.regY = bounds.height / 2
        foundationContainer.addChild(fText)
        stage.addChild(foundationContainer)
      },
      drawBase(stage) {
        const baseContainer = new createjs.Container()
        baseContainer.name = 'baseContainer'
        // base plate
        const basePlate = new createjs.Shape()
        basePlate.graphics.beginFill('#f15955').drawCircle(this.posX, this.posY, this.outerRadius)
        basePlate.shadow = new createjs.Shadow('#dd4642', 0, 4, 0)
        baseContainer.addChild(basePlate)
        // light
        const dottedCircleLight = this.dottedLine(this.outerRadius, 'light', '#fbf08f')
        const dottedCircleShadow = this.dottedLine(this.outerRadius, 'shadow', '#f8aca9')
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
        forEach(prizeList, (prize, idx) => {
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
          const label = new TextArc(prize.title, '14px Arial', '#f15955', labelRadius)
          const labelAngle = cumulativeAngle + (sectorAngle / 2.0)
          const labelX = posX + (labelRadius * Math.cos(labelAngle))
          const labelY = posY + (labelRadius * Math.sin(labelAngle))
          label.x = labelX
          label.y = labelY
          label.textAlign = 'center'
          label.rotation = ((labelAngle * 180) / Math.PI) + 90
          container.addChild(label)
          // image
          const prizeImage = new Image()
          prizeImage.src = prize.icon
          const prizeBitMapImg = new createjs.Bitmap(prize.icon)
          const prizeRadius = this.middleRadius * 0.5
          const prizeAngle = cumulativeAngle + (sectorAngle / 2.0)
          const prizeX = posX + (prizeRadius * Math.cos(prizeAngle))
          const prizeY = posY + (prizeRadius * Math.sin(prizeAngle))
          prizeBitMapImg.scaleX = 50 / prizeImage.width
          prizeBitMapImg.scaleY = 50 / prizeImage.height
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
      setBg(stage, bgImage) {
        const bigMapImg = new createjs.Bitmap(bgImage)
        bigMapImg.scaleX = this.canvasWidth / bgImage.width
        bigMapImg.scaleY = this.canvasHeight / bgImage.height
        stage.addChild(bigMapImg);
      },
      drawArrow(stage) {
        const arrowContainer = new createjs.Container()
        arrowContainer.name = 'arrowContainer'
        // arrow
        const arrow = new createjs.Bitmap(arrowImgUrl)
        arrow.scaleX = 70 / 210
        arrow.scaleY = 78.33 / 235
        arrow.x = this.posX - 35
        arrow.y = this.posY - (78.33 / 2) - 4
        arrowContainer.addChild(arrow)
        // start arrow text
        const startLabel = this.generateLabel('GO', 'startLabel', true)
        const pauseLabel = this.generateLabel('STOP', 'pauseLabel', false)
        arrowContainer.addChild(startLabel)
        arrowContainer.addChild(pauseLabel)
        arrowContainer.shadow = new createjs.Shadow('#ffffff', 0, 0, 100)
        // bind click event
        arrowContainer.addEventListener('click', this.animatePlate)
        stage.addChild(arrowContainer)
      },
    },
    mounted() {
      const prizeCount = prizeList.length || 1
      this.posX = this.canvasWidth / 2
      this.posY = this.canvasHeight / 2
      this.sectorAngle = (Math.PI * 2) / prizeCount
      this.outerRadius = (this.canvasWidth / 2) - 25
      this.middleRadius = (this.canvasWidth / 2) - 43
      this.middleBorderWidth = 4
      this.innerRadius = (this.canvasWidth / 2) - 78.5
      if (!this.stage) {
        this.stage = new createjs.Stage('mainCanvas')
        preloadImage(this.getImageList()).then(() => {
          const bgImg = new Image()
          bgImg.src = bgImgUrl
          this.setBg(this.stage, bgImg)
          this.drawFoundation(this.stage)
          this.drawBase(this.stage)
          this.drawMiddle(this.stage, this.prizeImg)
          this.drawArrow(this.stage)
//          this.stage.update()
        })
      }
    },
  }
</script>

<style lang="scss">
  @import '~theme/colors';
  @import '~theme/function';
  #mainCanvas{
    margin: 0;
    height: 100%;
    width: 100%;
    overflow: hidden;
    background-color: $grey-e5;
    color: $black;
  }
</style>
