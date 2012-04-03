/* Mocha test
   to use:
     npm install mocha
     mocha <filename>
   or
     npm test
*/

var assert = require('assert');
var mupdate = require('../lib/index');

describe('Readme example', function () {
  it('should properly apply MongoDB update operators to a local object', function (done) {
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
    
    return done();
  });
});