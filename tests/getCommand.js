var test = require('tape')
var getCommand = require('../lib/getCommand')

test('getCommand handles args and options', function (t) {
  t.plan(1)
  var args = [1, 2]
  var options = {
    a: 'apple',
    b: 'ball'
  }
  var expected = '1 2 -Da="apple" -Db="ball"'
  getCommand(args, options, function (err, actual) {
    if (err) t.error(err)
    t.equal(actual, expected)
  })
})

test('getCommand handles args only', function (t) {
  t.plan(1)
  var args = [1, 2]
  var expected = '1 2'
  getCommand(args, {}, function (err, actual) {
    if (err) t.error(err)
    t.equal(actual, expected)
  })
})

test('getCommand handles options only', function (t) {
  t.plan(1)
  var options = {
    a: 'apple',
    b: 'ball'
  }
  var expected = '-Da="apple" -Db="ball"'
  getCommand([], options, function (err, actual) {
    if (err) t.error(err)
    t.equal(actual, expected)
  })
})
