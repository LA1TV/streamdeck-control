const getAtemCommand = (atem, baseCommand) => {
  if (baseCommand === 'cut') return atem.setProgram
  if (baseCommand === 'preview') return atem.setPreview
}

const atemControl = (atem, command) => {
  const parsedCommand = command.split('_')
  console.log(parsedCommand[0], parsedCommand[1], parsedCommand[2])

  const atemComment = getAtemCommand(atem, parsedCommand[0])
  atemComment(parsedCommand[2])
}

module.exports = atemControl
