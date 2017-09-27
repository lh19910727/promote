import map from 'lodash/map'

export function preloadImage(imgList) {
  if (!imgList) {
    return false
  }
  return Promise.all(map(imgList, img => new Promise((resolve, reject) => {
    const image = new Image()
    image.onload = () => {
      resolve({
        image,
        title: img.title,
      })
    }
    image.onerror = (error) => {
      reject(error)
    }
    image.src = img.icon
  })))
}

export default {
  preloadImage,
}
