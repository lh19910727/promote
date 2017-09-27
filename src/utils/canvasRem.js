export default function canvasRem(size) {
  const deviceWidth = document.body.clientWidth
  return (size * deviceWidth) / 375
}
