const keyPress = command => keyIndex => {
  command[keyIndex] = 'pressed'
}

const keyRelease = command => keyIndex => {
  console.info('key released')
}

const error = command => error => {
  console.error(error)
}

const helpers = command => {
  return {
    keyPress: keyPress(command),
    keyRelease: keyRelease(command),
    error: error(command)
  }
}

module.exports = helpers
