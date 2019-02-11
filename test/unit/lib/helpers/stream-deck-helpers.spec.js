const { helpers } = require('../../../../src/lib/helpers/stream-deck-helpers')

let command = {}

describe('stream-deck-helpers', () => {
  describe('keyPress', () => {
    it('should call the command module with the key press', () => {
      const keyControl = helpers(command)
      keyControl.keyPress(1)
      expect(command).toEqual({ 1: 'pressed' })
    })
  })
})
