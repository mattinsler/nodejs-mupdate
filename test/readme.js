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

exports['readme_example'] = function () {
  var local = {
      'foo': 'bar',
      'nesting': {
          'keys': 'so',
          'I': ['can', 'use'],
          'dot': {
              'syntax': 'like a boss',
          },
      },
  };
  var update = {
      '$set': {
          'foo':'bar none',
      },
      '$push': {
          'nesting.I': 'pithy',
      },
  }
  var expected = {
    'foo': 'bar none',
    'nesting': {
        'keys': 'so',
        'I': ['can', 'use', 'pithy'],
        'dot': {
            'syntax': 'like a boss',
        },
    },
  };
  var result = mupdate.update(local, update);
  
  assert.deepEqual(result, expected);
  assert.deepEqual(local, result);
}