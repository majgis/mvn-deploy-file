function getCommand (args, options, next) {
  var optionsParsed = []

  for (var key in options) {
    var value = '-D' + key + '="' + options[key] + '"'
    optionsParsed.push(value)
  }

  var command = args.join(' ')

  if (optionsParsed.length) {
    if (command.length) {
      command += ' '
    }
    command += optionsParsed.join(' ')
  }
  next(null, command)
}

module.exports = getCommand
