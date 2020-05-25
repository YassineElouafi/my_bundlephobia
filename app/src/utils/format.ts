// taken from https://github.com/pastelsky/bundlephobia/blob/bundlephobia/utils/index.js

export const formatSize = (value: number) => {
  let unit, size
  if (Math.log10(value) < 3) {
    unit = 'B'
    size = value
  } else if (Math.log10(value) < 6) {
    unit = 'kB'
    size = value / 1024
  } else {
    unit = 'mB'
    size = value / 1024 / 1024
  }

  return { unit, size }
}

export const formatTime = (value: number) => {
  let unit, size
  if (value < 0.5) {
    unit = 'ms'
    size = Math.round(value * 1000)
  } else {
    unit = 's'
    size = value
  }

  return { unit, size }
}

const DownloadSpeed = {
  TWO_G: 30, // 2G Edge
  THREE_G: 50, // Emerging markets 3G
}
export const getTimeFromSize = (sizeInBytes: number) => {
  return {
    twoG: sizeInBytes / 1024 / DownloadSpeed.TWO_G,
    threeG: sizeInBytes / 1024 / DownloadSpeed.THREE_G,
  }
}
