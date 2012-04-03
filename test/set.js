/* Mocha test
   to use:
     npm install mocha
     mocha <filename>
   or
     npm test
*/

var assert = require('assert');
var mupdate = require('../lib/index');

describe('$set operator', function () {
  it('should write/overwrite keys', function (done) {
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
    
    return done();
  });
});