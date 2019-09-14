const streamDeckApi = require('stream-deck-api-mazeppa')
const AtemApi = require('atem')
// const atem = new AtemApi('192.168.72.51')
const DMX = require('dmx')
const dmx = new DMX()
const universe = dmx.addUniverse('demo', 'enttec-usb-dmx-pro', '/dev/cu.usbserial-6AU95XGB')
const lightsController = require('./lib/lights')(universe)

// off
universe.update({ 1: 0, 2: 0, 3: 0, 4: 0, 5: 255 })

// Red
universe.update({ 1: 255, 2: 0, 3: 0, 4: 0, 5: 255 })

// Green
universe.update({ 1: 0, 2: 255, 3: 0, 4: 0, 5: 255 })

// Blue
universe.update({ 1: 0, 2: 0, 3: 255, 4: 0, 5: 255 })

// Amber
universe.update({ 1: 0, 2: 0, 3: 0, 4: 255, 5: 255 })

// atem.connect()
let layout = {}

const padEmptyButtons = config => {
  const newButtons = config.buttons
  while (newButtons.length < 15) {
    newButtons.push({ name: '', disabled: true })
  }
  if (config.name !== 'root') {
    newButtons[14] = {
      name: 'ROOT',
      controlModule: 'folder',
      command: 'root',
      textColour: 'white',
      backgroundColour: 'black'
    }
  }
  return {
    ...config,
    buttons: newButtons
  }
}

const loadFolder = (folder = 'root', streamDeck) => {
  const config = padEmptyButtons(require(`./config/streamdeck/${folder}.json`))

  config.buttons.forEach((button, index) => {
    if (button.disabled) {
      streamDeck.drawText(' ', 'black', 'black', index + 1)
      return
    }
    streamDeck.drawText(button.name, button.textColour, button.backgroundColour, index + 1)
  })

  return config
}

const launchStreamdeck = () => {
  console.info('Launching streamdeck...')
  // console.log('Atem State: ', atem.state.toString())

  const streamDeck = streamDeckApi.getStreamDeck()

  layout = loadFolder('root', streamDeck)

  streamDeck.on('down', (buttonNumber) => {
    const button = layout.buttons[buttonNumber - 1]
    if (button.disabled) return
    if (button.controlModule === 'folder') {
      console.log('load folder')
      layout = loadFolder(button.command, streamDeck)
    }
    if (button.controlModule === 'lights') lightsController({ command: button.command, subCommand: button.subCommand })
    // if (button.controlModule === 'atem') atemControl(atem, button.command)
  })

  // atem.on('sourceConfiguration', console.info)

  streamDeck.on('error', console.error)
}

module.exports = launchStreamdeck
