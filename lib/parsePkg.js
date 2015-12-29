function parsePkg (arg, pkg) {
  var result = {}

  if (pkg && pkg.name) {
    result.artifactId = pkg.name
  }

  if (pkg && pkg.version) {
    result.version = pkg.version
  }

  var config = pkg['mvn-deploy-file'] || {}
  config = config[arg] || {}

  for (var key in config) {
    result[key] = config[key]
  }

  return result
}

module.exports = parsePkg
