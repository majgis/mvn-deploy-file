#!/usr/bin/env node

var mvnDeployFile = require('../index')
var minimist = require('minimist')
var options = minimist(process.argv.slice(2))
var args = options._
delete options._

mvnDeployFile(args, options, function onMvnDeployFile (err, url) {
  if (err) {
    throw err
  }
  console.log('Uploaded: ', url)
})
