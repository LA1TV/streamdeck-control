const streamDeckApi = require('stream-deck-api-mazeppa')
const AtemApi = require('atem')
const atem = new AtemApi('192.168.72.51')
const atemControl = require('./lib/atem.js')
atem.connect()
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
  console.log('Atem State: ', atem.state)

  const streamDeck = streamDeckApi.getStreamDeck()

  layout = loadFolder('root', streamDeck)

  streamDeck.on('down', (buttonNumber) => {
    const button = layout.buttons[buttonNumber - 1]
    if (button.disabled) return
    if (button.controlModule === 'folder') {
      console.log('load folder')
      layout = loadFolder(button.command, streamDeck)
    }
    if (button.controlModule === 'atem') atemControl(atem, button.command)
  })

  atem.on('connectionStateChange', console.info)
  atem.on('error', console.error)
  atem.on('programBus', console.info)

  streamDeck.on('error', console.error)
}

module.exports = launchStreamdeck
