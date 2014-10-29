module.exports.update = update

var simplesets = require('simplesets');

function _dive(obj, keys, create) {
  if (keys.length > 1) {
    if (!obj[keys[0]]) {
      if (create) {
        obj[keys[0]] = {};
      } else {
        return null;
      }
    }
    return _dive(obj[keys[0]], keys.slice(1), create);
  } else {
    return obj;
  }
}

function _last(keys) {
  return keys[keys.length - 1];
}

function _in(key, list) {
  var obj = {};
  for (var index in list) {
    obj[list[index]] = true;
  }
  return (key in obj);
}

function _unset(obj, keys, value) {
  if (value) {
    var deepest = _dive(obj, keys, false);
    if (deepest) {
      delete deepest[_last(keys)];
    }
  }
}

function _set(obj, keys, value) {
  var deepest = _dive(obj, keys, true);
  deepest[_last(keys)] = value;
}

function _push(obj, keys, value) {
  var deepest = _dive(obj, keys, true);
  if (!(deepest[_last(keys)] instanceof Array)) {
    deepest[_last(keys)] = []
  }
  deepest[_last(keys)].push(value);
}

function _pushAll(obj, keys, values) {
  var deepest = _dive(obj, keys, true);
  if (deepest[_last(keys)]) {
    for (var index in values) {
      if (values[index] in deepest) {
        
      }
    }
  } else {
    deepest[_last(keys)] = values;
  }
}

function _inc(obj, keys, value) {
  var deepest = _dive(obj, keys, true);
  deepest[_last(keys)] = (deepest[_last(keys)] || 0) + value;
}

function _addToSet(obj, keys, value) {
  var deepest = _dive(obj, keys, true);
  var values = [];
  if (value && value['$each']) {
    values = value['$each'];
  } else {
    values.push(value);
  }
  if (!deepest[_last(keys)]) {
    deepest[_last(keys)] = [];
  }
  var existing = new simplesets.Set(deepest[_last(keys)]);
  for (var index in values) {
    if (!existing.has(values[index])) {
      existing.add(values[index]);
      if (!(deepest[_last(keys)] instanceof Array)) {
        deepest[_last(keys)] = []
      }
      deepest[_last(keys)].push(values[index]);
    }
  }
}

var commands = {
  '$addToSet': _addToSet,
  '$inc': _inc,
  '$push': _push,
  '$pushAll': _pushAll,
  '$set': _set,
  '$unset': _unset,
};

function update(original, modifier) {
  for (var command in modifier) {
    for (var key in modifier[command]) {
      commands[command](original, key.split('.'), modifier[command][key]);
    }
  }
  return original;
}