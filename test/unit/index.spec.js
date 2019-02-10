const index = require('../../src/index')

console.info = jest.fn()

describe('index', () => {
  it('should output a starting command to the console', () => {
    index()
    expect(console.info).toHaveBeenCalledTimes(1)
    expect(console.info).toHaveBeenCalledWith('Launching streamdeck...')
  })
})
