function getVersionSuffix (arg) {
  var isSnapshot = arg && arg.toLowerCase().indexOf('snapshot') > -1
  return isSnapshot ? '-SNAPSHOT' : ''
}

module.exports = getVersionSuffix
