import { toString } from './base';

function isString(object: unknown): object is string {
  return typeof object === 'string';
}

function isNumber(object: unknown): object is number {
  return typeof object === 'number';
}

function isBoolean(object: unknown): object is boolean {
  return typeof object === 'boolean';
}

function isObject(object: unknown): object is object {
  return toString(object) === '[object Object]';
}

// eslint-disable-next-line @typescript-eslint/ban-types
function isFunction<T extends Function>(object: unknown): object is T {
  return typeof object === 'function';
}

export { isString, isNumber, isBoolean, isObject, isFunction };
