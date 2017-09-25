function init() {
  stage = new createjs.Stage("myCanvas");
  var circle = new createjs.Shape();
  circle.graphics
    .beginRadialGradientFill(["#FFFFFF","#000000","#FFFFFF"], [0, .5, 1], 100, 100, 0, 100, 100, 100)
    .drawCircle(100, 100, 100)
    .beginLinearGradientFill(["#FF0000","#00FF00","#0000FF"], [0, .5, 1], 0, 200, 0, 600)
    .drawRect(200, 200, 400, 400);
  circle.x = 10;
  circle.y = 10;
  stage.addChild(circle);
  stage.update();
}
