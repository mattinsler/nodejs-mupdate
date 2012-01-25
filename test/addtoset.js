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
      'foo': ['foo', 'fu'],
      'bar': ['bar', 'barre'],
  };
  var update = {
      '$addToSet': {
          'foo': 'FU',
          'bar': {
            '$each': ['---', 'bar'],
          },
      },
  }
  var expected = {
    'foo': ['foo', 'fu', 'FU'],
    'bar': ['bar', 'barre', '---'],
  };
  var result = mupdate.update(local, update);
  
  assert.deepEqual(result, expected);
  assert.deepEqual(local, result);
}