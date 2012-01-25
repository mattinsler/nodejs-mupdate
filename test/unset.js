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

exports['unset'] = function () {
  var local = {
      'foo': 'bar',
      'deeper': {
        'foo': 'bar',
      },
      'list': ['foo', 'bar'],
  };
  var update = {
      '$unset': {
          'foo': 1,
          'deeper.foo': true,
          'deeper': false,
      },
  }
  var expected = {
    'deeper': {},
    'list': ['foo', 'bar'],
  };
  var result = mupdate.update(local, update);
  
  assert.deepEqual(result, expected);
  assert.deepEqual(local, result);
}