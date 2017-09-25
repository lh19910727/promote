import map from 'lodash/map'

export function preloadImage(imgUrlList) {
  if (!imgUrlList) {
    return false
  }
  return Promise.all(map(imgUrlList, imgUrl => new Promise((resolve, reject) => {
    const image = new Image()
    image.onload = () => {
      resolve(image)
    }
    image.onerror = (error) => {
      reject(error)
    }
    image.src = imgUrl
  })))
}

export default {
  preloadImage,
}
