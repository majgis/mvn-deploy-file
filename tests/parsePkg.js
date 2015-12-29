var test = require('tape')
var parsePkg = require('../lib/parsePkg')

test('parsePkg pulls artifactId and version from pkg name and version' +
' respectively',
  function (t) {
    t.plan(1)
    var pkg = {
      version: '1.2.3',
      name: 'test'
    }
    var expected = {
      'version': '1.2.3',
      'artifactId': 'test'
    }
    var actual = parsePkg('n/a', pkg)
    t.deepEqual(actual, expected)
  })

test('parsePkg pulls options from mvn-deploy-file section of pkg based on' +
' the given arg',
  function (t) {
    t.plan(1)
    var pkg = {
      'mvn-deploy-file': {
        'xyz': {
          groupId: 'testGroup'
        }
      }
    }
    var expected = {
      'groupId': 'testGroup'
    }
    var actual = parsePkg('xyz', pkg)
    t.deepEqual(actual, expected)
  })
