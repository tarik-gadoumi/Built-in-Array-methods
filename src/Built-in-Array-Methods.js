// @flow
const _ = {};
const { isArray } = Array;
type fn<T> = (T, number, Array<T>) => void;
type mapCallbackT<T> = (T, number, Array<T>) => T;
type filterCallback<T> = (T, number, Array<T>) => T;
type reduceCallbackT<TR, T> = (TR, any) => TR;
type findIndexT<T> = (T, number, Array<T>) => boolean;
type findT<T> = (T) => boolean;
type everyT<T> = (T, number, Array<T>) => boolean;
type someT<T> = (T, number, Array<T>) => boolean;

_.each = function <T>(list: Array<T>, callback: fn<T>): void {
  if (isArray(list)) {
    for (let i = 0; i < list.length; i++) {
      callback(list[i], i, list);
    }
  } else {
    throw new Error(`Method reserved only for "Arrays"`);
  }
};
_.push = function <T>(list: Array<T>, ...values: Array<T>): number {
  const copy = [...values];
  _.each(copy, (v, i, l) => {
    list[list.length] = v;
  });
  return list.length;
};
_.map = function <T>(list: Array<T>, callback: mapCallbackT<T>): Array<T> {
  const result = [];
  _.each(list, (v, i, l) => {
    _.push(result, callback(v, i, l));
  });
  return result;
};
_.filter = function <T>(list: Array<T>, callback: filterCallback<T>): Array<T> {
  const result = [];
  _.each(list, (v, i, l) => {
    if (callback(v, i, l)) {
      _.push(result, v);
    }
  });
  return result;
};
_.reduce = function <T, TR>(
  list: Array<T>,
  callback: reduceCallbackT<TR, T>,
  initial: TR
): TR {
  let accumulator = initial;
  for (const element of list) {
    accumulator = callback(accumulator, element);
  }
  return accumulator;

  // _.each(list, (v, i, l) => {
  //   if (i === 0 && !initial) {
  //     accumulator  = v;
  //   } else {
  //       accumulator  = callback(accumulator, v);
  //     }
  // });
  //  return accumulator;
};
_.findIndex = function <T>(list: Array<T>, callback: findIndexT<T>): ?number {
  let index;
  _.each(list, (v, i, l) => {
    if (callback(v, i, l)) {
      index = i;
    }
    if (!list[index]) {
      index = -1;
    }
  });
  return index;
};
_.find = function <T>(list: Array<T>, callback: findT<T>): ?T {
  let index = _.findIndex(list, callback);
  typeof index === "number" && index !== -1 ? list[index] : undefined;
};
_.indexOf = function <T>(list: Array<T>, searchedValue: T): ?number {
  return _.findIndex(list, (v, i, l) => {
    return v === searchedValue;
  });
};
_.lastIndexOf = function <T>(list: Array<T>, searchedValue: T): ?number {
  for (let i = list.length - 1; i < list.length; i--) {
    if (i === -1) return;
    return _.findIndex(list, (v, i, l) => {
      return v === searchedValue;
    });
  }
};
_.every = function <T>(list: Array<T>, callback: everyT<T>): ?boolean {
  let result;
  _.each(list, (v, i, l) => {
    if (!callback(v, i, l)) {
      result = false;
    }
    result = true;
  });
  return result;
};
_.some = function <T>(list: Array<T>, callback: someT<T>): ?boolean {
  let result;
  _.each(list, (v, i, l) => {
    if (callback(v, i, l)) {
      result = true;
    }
    result = false;
  });
  return result;
};
_.includes = function <T>(list: Array<T>, searchedValue): ?boolean {
  let maybeIncluded = _.find(list, (v) => {
    return searchedValue === v;
  });
  maybeIncluded ? true : false;
};
_.concat = function <T>(list: Array<T>, ...values: $ReadOnlyArray<any>): Array<T> {
  const copyList = [...list];
  const copyValues = [...values];
  _.each(copyValues, (v, i, l) => {
    if (isArray(v)) {
      _.push(copyList, ...v);
    } else {
      _.push(copyList, v);
    }
  });
  return copyList;
};
_.flat = function <T>(list: Array<T>, depth: number = 0): Array<T> {
  if (depth < 1 || !isArray(list)) return list;
  return _.reduce(
    list,
    (prev, v) => {
      return _.concat(prev, _.flat(v, depth - 1));
    },
    []
  );
};
_.flatMap = function<T> (list: Array<T>, callback:mapCallbackT<T>): Array<T> {
  return _.flat(_.map(list, callback), 1);
};
_.join = function join<T>(list :Array<T>, Separator : ?string) : ?string{
 return _.reduce(list, (sum , v ) =>  sum && Separator ?`${sum}${Separator}${v}` : void 0 );
};
_.reverse = function<T> (list:Array<T>)  : void | Array<T>{
  const result = [];
  for (let i = list.length - 1; i < list.length; i--) {
    if (i === -1) return result;
    _.push(result, list[i]);
  }
};
_.shift = function <T>(list :Array<T>)  : T{
  let fisrtElement = list[0];
  _.each(list, (v, i, l) => {
    list[i - 1] = v;
  });
  list.length = list.length - 1;
  return fisrtElement;
};
_.unshift = function <T,K:any> (list: Array<T>, ...values : Array<K>) :number {
  let emergedArray = _.concat(values, ...list);
  _.each(emergedArray, (v, i, l) => {
    return (list[i] = v);
  });
  return list.length;
};
_.slice = function <T>(list : Array<T>, indexStart :number = 0, End : number = list.length) : Array<T> {
  let result = [];
  for (let i = indexStart; i < End; i++) {
    _.push(result, list[i]);
  }
  return result;
};
_.splice = function <T>(list: Array<T>, indexStart : number = 0, indexEnd : number, ...values : any) : Array<T> {
  let RemovedElements = [];
  for (let i = indexStart; i < indexEnd; i++) {
    _.push(RemovedElements, _.shift(list));
  }
  list = _.concat(...values, list);
  return RemovedElements;
};
_.pop = function <T>(list:Array<T>) :T {
  let lastElement = list[list.length - 1];
  list.length = list.length - 1;
  return lastElement;
};
_.fill = function  <T>(list : Array<T>, value : any, indexStart : number = 0, endIndex  : number= list.length) : Array<T> {
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
