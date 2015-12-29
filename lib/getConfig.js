var loadup = require('./loadup')
var jsonfile = require('jsonfile')
var async = require('async')
var parsePkg = require('./parsePkg')
var extend = require('extend')
var getVersionSuffix = require('./getVersionSuffix')

function getConfig (arg, options, next) {
  var tasks = [
    loadup.bind(null, process.cwd(), 'package.json')
  ]

  if (options.config) {
    tasks.push(jsonfile.readFile.bind(jsonfile, options.config))
  }

  async.parallel(tasks, function (err, results) {
    if (err) return next(err)

    var pkgConfig = parsePkg(arg, results[0])
    var config = options.config && results[1][arg] ? results[1][arg] : {}
    var result = extend({}, pkgConfig, config, options)

    delete result.config
    if (result.version) {
      result.version += getVersionSuffix(arg)
    }

    next(err, result)
  })
}

module.exports = getConfig
