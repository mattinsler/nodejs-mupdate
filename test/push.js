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
      '$push': {
          'list':'taz',
      },
  }
  var expected = {
    'foo': 'bar',
    'deeper': {
        'foo': 'bar',
    },
    'list': ['foo', 'bar', 'taz'],
  };
  var result = mupdate.update(local, update);
  
  assert.deepEqual(result, expected);
  assert.deepEqual(local, result);
}