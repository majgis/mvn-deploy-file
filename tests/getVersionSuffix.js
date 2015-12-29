var test = require('tape')
var getVersionSuffix = require('../lib/getVersionSuffix')

test('getVersionSuffix returns -SNAPSHOT if snapshot in arg', function (t) {
  t.plan(1)
  var expected = '-SNAPSHOT'
  var actual = getVersionSuffix('something-snapshot')
  t.equal(actual, expected)
})

test('getVersionSuffix returns empty string if snapshot is not in arg', function (t) {
  t.plan(1)
  var expected = ''
  var actual = getVersionSuffix('something')
  t.equal(actual, expected)
})
