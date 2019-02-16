const { helpers } = require('../../../../src/lib/helpers/stream-deck-helpers')

let mockCommand = {}

describe('stream-deck-helpers', () => {
  describe('keyPress', () => {
    it('should call the command module with the key press', () => {
      const keyControl = helpers(mockCommand)
      keyControl.keyPress(1)
      expect(mockCommand).toEqual({ 1: 'pressed' })
    })
  })
})
