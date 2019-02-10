const eventloop = require('../../../src/lib/eventloop')
const atem = require('../../../src/lib/controlModules/atem')

atem.runCommand = jest.fn()
console.info = jest.fn()

describe('index', () => {
  beforeEach(() => {
    atem.runCommand.mockClear()
    console.info.mockClear()
  })

  it('should output a starting command to the console', () => {
    eventloop([])
    expect(console.info).toHaveBeenCalledTimes(1)
    expect(console.info).toHaveBeenCalledWith('event')
  })

  it('should clone and run the commands its passed', () => {
    const commandsToExecute = [
      {
        'controlModule': 'atem',
        'command': 'someCommand'
      }
    ]
    eventloop(commandsToExecute)
    expect(atem.runCommand).toHaveBeenCalledTimes(1)
    expect(atem.runCommand).toHaveBeenCalledWith('someCommand')
  })
})
