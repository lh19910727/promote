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
  import { preloadImage } from '@/utils/imageUtil'
  import prizeList from '@/constants/prizeData'

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
      getImageList() {
        return [bgImgUrl].concat(map(prizeList, prize => prize.icon))
      },
      doAnimate(event) {
        const pricePlate = this.stage.getChildByName('prizePlate')
        pricePlate.rotation += (event.delta / 500) * 180
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
          createjs.Ticker.removeEventListener('tick', this.doAnimate);
          this.stage.update()
        }
      },
      generateLabel(text, name, visible) {
        // arrow text
        const arrowText = new createjs.Text(text, '18px Arial', '#ffda30')
        arrowText.name = name
        arrowText.x = this.posX
        arrowText.y = this.posY + 10
        arrowText.textAlign = 'center'
        arrowText.textBaseline = 'bottom'
        arrowText.visible = visible
        return arrowText
      },
      drawBase(stage) {
        const circle = new createjs.Shape()
        const radius = (this.canvasWidth - 30) / 2
        circle.graphics.beginFill('#ffda30').drawCircle(this.posX, this.posY, radius)
        stage.addChild(circle)
      },
      drawMiddle(stage) {
        const middleContainer = new createjs.Container()
        middleContainer.name = 'prizePlate'
        const radius = (this.canvasWidth - 60) / 2
        const posX = this.posX
        const posY = this.posY
        let cumulativeAngle = 0;
        const sectorAngle = this.sectorAngle
        forEach(prizeList, prize => {
          const container = new createjs.Container()
          // sector base
          const sector = new createjs.Shape()
          sector.graphics.moveTo(posX, posY)
            .setStrokeStyle(1)
            .beginStroke('#ff0000')
          sector.graphics
            .arc(posX, posY, radius, cumulativeAngle, cumulativeAngle + sectorAngle)
            .lineTo(posX, posY)
          sector.graphics.closePath()
          container.addChild(sector)
          // label
          const label = new createjs.Text(prize.title, '14px Arial', '#000000')
          const labelRadius = radius * 0.77
          const labelAngle = cumulativeAngle + (sectorAngle / 2.0)
          const labelX = posX + (labelRadius * Math.cos(labelAngle))
          const labelY = posY + (labelRadius * Math.sin(labelAngle))
          label.x = labelX
          label.y = labelY
          label.textAlign = 'center'
          label.textBaseline = 'bottom'
          label.rotation = ((labelAngle * 180) / Math.PI) + 90
          container.addChild(label)
          // image
          const prizeImage = new Image()
          prizeImage.src = prize.icon
          const prizeBitMapImg = new createjs.Bitmap(prizeImage)
          const prizeRadius = radius * 0.60
          const prizeAngle = cumulativeAngle + (sectorAngle / 2.0)
          const prizeX = posX + (prizeRadius * Math.cos(prizeAngle))
          const prizeY = posY + (prizeRadius * Math.sin(prizeAngle))
          prizeBitMapImg.scaleX = 50 / prizeImage.width
          prizeBitMapImg.scaleY = 35 / prizeImage.height
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
        middleContainer.rotation = this.sectorAngle
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
        const arrow = new createjs.Shape()
        arrow.graphics
          .moveTo(this.posX, this.posY)
          .setStrokeStyle(2)
          .beginStroke('#ffda30')
          .beginFill('#ff0000')
          .arc(this.posX, this.posY, 35, -(Math.PI / 3), (4 * Math.PI) / 3)
          .lineTo(this.posX, this.posY - 55)
          .closePath()
        arrowContainer.addChild(arrow)
        // start arrow text
        const startLabel = this.generateLabel('开始', 'startLabel', true)
        const pauseLabel = this.generateLabel('结束', 'pauseLabel', false)
        arrowContainer.addChild(startLabel)
        arrowContainer.addChild(pauseLabel)
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
      if (!this.stage) {
        this.stage = new createjs.Stage('mainCanvas')
        preloadImage(this.getImageList()).then(() => {
          const bgImg = new Image()
          bgImg.src = bgImgUrl
          this.setBg(this.stage, bgImg)
          this.drawBase(this.stage)
          this.drawMiddle(this.stage, this.prizeImg)
          this.drawArrow(this.stage)
          this.stage.update()
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
