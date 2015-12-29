var findup = require('findup')
var jsonfile = require('jsonfile')
var path = require('path')

function onLoadUp (next, fileName, err, dir) {
  if (err) {
    next(null, {})
  } else {
    var filePath = dir + path.sep + fileName
    jsonfile.readFile(filePath, function (err, obj) {
      next(err, obj)
    })
  }
}

function loadup (dir, fileName, next) {
  findup(dir, fileName, onLoadUp.bind(null, next, fileName))
}

module.exports = loadup
