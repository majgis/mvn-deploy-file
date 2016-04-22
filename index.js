var async = require('async')
var AsyncArgs = require('async-args')
var getConfig = require('./lib/getConfig')
var getCommand = require('./lib/getCommand')
var exec = require('child_process').exec
var glob = require('glob')
var path = require('path')
var URL_REGEX = /^Uploading: (http.*)$/m

function storeAndPass (obj, key, value, next) {
  obj[key] = value
  next(null, value)
}

function getGlobPattern (globPattern, config, next) {
  globPattern = globPattern || config.file
  if (!globPattern) {
    return next(new Error('No file was specified.'))
  }
  next(null, globPattern)
}

function checkAndStoreFilePath (context, matches, next) {
  if (matches.length === 0) {
    return next(new Error('No file was found.'))
  }
  if (matches.length > 1) {
    return next(new Error('More than one file was found.'))
  }
  var config = context.config
  config.file = matches[0]
  if (!config.packaging) {
    config.packaging = path.extname(config.file).replace('.', '')
  }
  next(null, config)
}

function getUrl(stdout, stderr, next){
  var url
  var match = stdout.toString('utf8').match(URL_REGEX)
  if (match){
    url = match[1]
  }
  next(null, url)
}

function mvnDeployFile (args, options, next) {
  var target = args[0]
  var globPattern = args[1]
  var context = {}

  async.waterfall([
    getConfig.bind(null, target, options),
    storeAndPass.bind(null, context, 'config'),
    getGlobPattern.bind(null, globPattern),
    glob,
    checkAndStoreFilePath.bind(null, context),
    getCommand.bind(null, ['mvn', '-e', 'deploy:deploy-file']),
    AsyncArgs.appendConstants({maxBuffer: 1024 * 5000}),
    exec,
    getUrl
  ], next)
}

module.exports = mvnDeployFile
