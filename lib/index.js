module.exports.update = update

function _set(obj, keys, value) {
  if (keys.length > 1) {
    if (!obj[keys[0]]) {
      obj[keys[0]] = {};
    }
    _set(obj[keys[0]], keys.slice(1), value)
  } else {
    obj[keys[0]] = value;
  }
}

function _push(obj, keys, value) {
  if (keys.length > 1) {
    if (!obj[keys[0]]) {
      obj[keys[0]] = {};
    }
    _push(obj[keys[0]], keys.slice(1), value)
  } else {
    if (obj[keys[0]]) {
      obj[keys[0]].push(value);
    } else {
      obj[keys[0]] = [value];
    }
  }
}

var commands = {
  '$set': _set,
  '$push': _push,
};

function update(original, modifier) {
  for (command in modifier) {
    for (key in modifier[command]) {
      commands[command](original, key.split('.'), modifier[command][key])
    }
  }
  return original;
}