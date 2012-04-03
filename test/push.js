/* Mocha test
   to use:
     npm install mocha
     mocha <filename>
   or
     npm test
*/

var assert = require('assert');
var mupdate = require('../lib/index');

describe('$push operator', function () {
  it('should create/append keys to lists', function (done) {
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

    return done();
  });
});