/* Mocha test
   to use:
     npm install mocha
     mocha <filename>
   or
     npm test
*/

var assert = require('assert');
var mupdate = require('../lib/index');

describe('$inc operator', function () {
  it('should write/increment keys', function (done) {
    var local = {
      shallow: 0,
      deeper: {
        foo: 4
      }
    };
    var update = {
      $inc: {
        shallow: 3,
        'deeper.foo': 2,
        'deepest.foo.bar.baz': 5
      }
    }
    var expected = {
      shallow: 3,
      deeper: {
        foo: 6
      },
      deepest: {
        foo: {
          bar: {
            baz: 5
          }
        }
      }
    };
    var result = mupdate.update(local, update);
  
    assert.deepEqual(result, expected);
    assert.deepEqual(local, result);
    
    return done();
  });
});