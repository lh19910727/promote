export default class TextArc extends createjs.Text {
  constructor(text, font, color, radius, maxLength) {
    super(text, font, color)
    this.radius = radius;
    this.textBaseline = 'bottom';
    this.textAlign = 'center';
    this.maxLength = maxLength;
  }

  _drawTextLine(ctx, text, y) {
    const wordWidth = ctx.measureText(text).width;
    const maxLen = this.maxLength;
    const angle = 2 * Math.asin((wordWidth > maxLen ? maxLen : wordWidth) / (2 * this.radius));
    ctx.save();
    ctx.rotate(-1 * (angle / 2));
    ctx.rotate(-1 * ((angle / text.length) / 2))
    for (let i = 0; i < text.length; i++) { // eslint-disable-line
      ctx.rotate(angle / text.length);
      ctx.save();
      ctx.translate(0, -1 * this.radius);
      super._drawTextLine(ctx, text[i], y); // eslint-disable-line
      ctx.restore();
    }
    ctx.restore();
  }
}
