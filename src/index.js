const streamDeckApi = require('stream-deck-api-mazeppa')
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

  const streamDeck = streamDeckApi.getStreamDeck()

  layout = loadFolder('root', streamDeck)

  streamDeck.on('error', console.log)
  streamDeck.on('down', (buttonNumber) => {
    const button = layout.buttons[buttonNumber - 1]
    if (button.disabled) return
    if (button.controlModule === 'folder') {
      console.log('load folder')
      layout = loadFolder(button.command, streamDeck)
    }
  })
}

module.exports = launchStreamdeck
