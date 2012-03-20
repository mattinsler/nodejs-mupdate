var mupdate = require('../lib/index');
var assert = require('assert');
var path = require('path');

var localExpresso = path.normalize(
    __dirname + '/../node_modules/.bin/expresso'
);

var expresso = process.argv[1] === localExpresso
    ? 'node ./node_modules/.bin/expresso'
    : 'expresso'
;

exports['set'] = function () {
  var local = {
      'foo': 'bar',
      'deeper': {
        'foo': 'bar',
      },
      'list': ['foo', 'bar'],
  };
  var update = {
      '$set': {
          'foo':'bar none',
          'deeper.foo': 'bar one',
          'list2': ['fooer', 'barrer'],
      },
  }
  var expected = {
    'foo': 'bar none',
    'deeper': {
        'foo': 'bar one',
    },
    'list': ['foo', 'bar'],
    'list2': ['fooer', 'barrer'],
  };
  var result = mupdate.update(local, update);
  
  assert.deepEqual(result, expected);
  assert.deepEqual(local, result);
}