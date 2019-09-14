let active = false
let currentCommand = ''
let currentState = ''

const DARK = { '1': 0, '2': 0, '3': 0, '4': 0 }
const delay = (time) => new Promise((resolve) => setTimeout(resolve, time))

const flash = async ({ universe, command, duration }) => {
  if (!active) return undefined

  if (currentState !== currentCommand) {
    universe.update(command)
    currentState = JSON.stringify(command)
  } else {
    universe.update(DARK)
    currentState = JSON.stringify(DARK)
  }

  await delay(duration)
  flash({ universe, command, duration })
}

const lightsController = (universe) => async ({ command, subCommand: { type = 'still', duration = 1000 } = {} }) => {
  active = true
  if (type === 'still') {
    currentCommand = JSON.stringify(command)
    universe.update(command)
    active = false
  }
  if (type === 'flash') {
    currentCommand = JSON.stringify(command)
    currentState = ''
    await flash({ universe, command, duration })
  }
}

module.exports = lightsController
