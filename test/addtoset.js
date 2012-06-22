/* Mocha test
   to use:
     npm install mocha
     mocha <filename>
   or
     npm test
*/

var assert = require('assert');
var mupdate = require('../lib/index');

describe('$addToSet operator', function () {
  it('should create/insert keys in lists only if not already present', function (done) {
    var local = {
        'foo': ['foo', 'fu'],
        'bar': ['bar', 'barre'],
        'baz': {'a': 'b'},
    };
    var update = {
        '$addToSet': {
            'foo': 'FU',
            'bar': {
              '$each': ['---', 'bar'],
            },
            'baz': 'stomp',
            'extra': 'read all about it',
        },
    }
    var expected = {
      'foo': ['foo', 'fu', 'FU'],
      'bar': ['bar', 'barre', '---'],
      'baz': ['stomp'],
      'extra': ['read all about it'],
    };
    var result = mupdate.update(local, update);

    assert.deepEqual(result, expected);
    assert.deepEqual(local, result);
    
    return done();
  });
});