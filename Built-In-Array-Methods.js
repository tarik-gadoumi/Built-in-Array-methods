const _ = {};
const { isArray } = Array;
_.each = function (list, callback) {
  if (isArray(list)) {
    for (let i = 0; i < list.length; i++) {
      callback(list[i], i, list);
    }
  } else {
    throw new Error(`Method reserved for "Arrays"`);
  }
};
_.push = function (list, ...values) {
  const copy = [...values];
  _.each(copy, (v, i, l) => {
    list[list.length] = v;
  });

  return list.length;
};
_.map = function (list, callback) {
  const result = [];
  _.each(list, (v, i, l) => {
    _.push(result, callback(v, i, l));
  });
  return result;
};
_.filter = function (list, callback) {
  const result = [];
  _.each(list, (v, i, l) => {
    if (callback(v, i, l)) {
      _.push(result, v);
    }
  });
  return result;
};
_.reduce = function (list, callback, initial) {
  let accumulator = initial;
  _.each(list, (v, i, l) => {
    if (i === 0 && accumulator === undefined) {
      accumulator = list[i];
    } else {
      accumulator = callback(accumulator, v);
    }
  });
  return accumulator;
};
_.findIndex = function (list, callback) {
  let index;
  _.each(list, (v, i, l) => {
    if (callback(v)) {
      index = i;
    }
    if (!list[index]) {
      return -1;
    }
  });
  return index;
};
_.find = function (list, callback) {
  let index = _.findIndex(list, callback);
  if (list[index] === -1) {
    return undefined;
  } else {
    return list[index];
  }
};
_.indexOf = function (list, searchedValue) {
  return _.findIndex(list, (v) => {
    return v === searchedValue;
  });
};
_.lastIndexOf = function (list, searchedValue) {
  for (let i = list.length - 1; i < list.length; i--) {
    return _.findIndex(list, (v) => {
      return v == searchedValue;
    });
  }
};
_.every = function (list, callback) {
  let result;
  _.each(list, (v, i, l) => {
    if (!callback(v, i, l)) {
      return (result = false);
    }
    result = true;
  });
  return result;
};
_.some = function (list, callback) {
  let result;
  _.each(list, (v, i, l) => {
    if (callback(v, i, l)) {
      return (result = true);
    }
    result = false;
  });
  return result;
};
_.includes = function (list, searchedValue) {
  let maybeIncluded = _.find(list, searchedValue);
  if (maybeIncluded) {
    return true;
  }
  return false;
};
_.concat = function (list, ...values) {
  const copyList = [...list];
  const copy = [...values];
  _.each(copy, (v, i, l) => {
    if (isArray(v)) {
      _.push(copyList, ...v);
    } else {
      _.push(copyList, v);
    }
  });
  return copyList;
};
_.flat = function (list, depth = 0) {
  if (depth < 1 || !isArray(list)) return list;
  return _.reduce(
    list,
    (prev, v) => {
      return _.concat(prev, _.flat(v, depth - 1));
    },
    []
  );
};
_.flatMap = function (list, callback) {
  return _.flat(_.map(list, callback), 1);
};
_.join = function join(list, Separator) {
  return _.reduce(list, (sum, v) => sum + Separator + v);
};
_.reverse = function (list) {
  const result = [];
  for (let i = list.length - 1; i < list.length; i--) {
    if (i === -1) return result;
    _.push(result, list[i]);
  }
};
_.shift = function (list) {
  let fisrtElement = list[0];
  _.each(list, (v, i, l) => {
    list[i - 1] = v;
  });
  list.length = list.length - 1;
  return fisrtElement;
};
_.unshift = function (list, ...values) {
  let emergedArray = _.concat(values, ...list);
  _.each(emergedArray, (v, i, l) => {
    return (list[i] = v);
  });
  return list.length;
};
_.slice = function (list, indexStart = 0, End = list.length) {
  let result = [];
  for (let i = indexStart; i < End; i++) {
    _.push(result, list[i]);
  }
  return result;
};
_.splice = function (list, indexStart = 0, indexEnd, ...values) {
  let RemovedElements = [];
  for (let i = indexStart; i < indexEnd; i++) {
    _.push(RemovedElements, _.shift(list));
  }
  list = _.concat(...values, list);
  return RemovedElements;
};
_.pop = function (list) {
  let lastElement = list[list.length - 1];
  list.length = list.length - 1;
  return lastElement;
};
_.fill = function (list, value, indexStart = 0, endIndex = list.length) {
  for (let i = indexStart; i < endIndex; i++) {
    list[i] = value;
  }
  return list;
};
_.values = function values(list) {
  function* gen() {
    for (let i = 0; i < list.length; i++) {
      yield list[i];
    }
  }
  return gen();
};
_.keys = function keys(list) {
  function* gen() {
    for (let i = 0; i < list.length; i++) {
      yield i;
    }
  }
  return gen();
};
_.entries = function entries(list) {
  function* gen() {
    for (let i = 0; i < list.length; i++) {
      yield [i, list[i]];
    }
  }
  return gen();
};
