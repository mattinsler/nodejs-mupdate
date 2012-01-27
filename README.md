# mupdate [![Build Status](http://travis-ci.org/AppLovin/nodejs-mupdate.png)](http://travis-ci.org/AppLovin/nodejs-mupdate)

A NodeJS library which can parse Mongo update modifier command and apply them to local objects.

## Installation

### Installing npm (node package manager)
```
curl http://npmjs.org/install.sh | sh
```

### Installing mupdate
```
npm install mupdate
```

## Example Usage

```javascript
var mupdate = require('mupdate')
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

// mupdate.update updates the original in-place and returns it with changes
// applied.
console.log(mupdate.update(local, update));
console.log('===');
console.log(local);

```
