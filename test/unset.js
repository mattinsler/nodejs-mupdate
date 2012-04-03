/* Mocha test
   to use:
     npm install mocha
     mocha <filename>
   or
     npm test
*/

var assert = require('assert');
var mupdate = require('../lib/index');

describe('$unset operator', function () {
  it('should remove keys', function (done) {
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
    
    return done();
  });
});