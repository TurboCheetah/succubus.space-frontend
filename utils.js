class Utils {
  constructor() {
    throw new Error('This is a static class and cannot be instantiated')
  }

  static toProperCase(str) {
    return str.replace(/([^\W_]+[^\s-]*) */g, txt => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase())
  }

  // Convert milliseconds into human readable string.
  static getDuration(time) {
    const seconds = Math.floor(time / 1000) % 60
    const minutes = Math.floor((time / (1000 * 60)) % 60)
    const hours = Math.floor((time / (1000 * 60 * 60)) % 24)
    const days = Math.floor((time / (1000 * 60 * 60 * 24)) % 7)
    return [`${days} Days`, `${hours} Hours`, `${minutes} Minutes`, `${seconds} Seconds`].filter(time => !time.startsWith('0')).join(', ')
  }
}

export default Utils
