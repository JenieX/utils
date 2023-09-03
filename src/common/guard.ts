function asserted<T>(object: T | null | undefined): T {
  if (object === null || object === undefined) {
    throw new Error('Value is either null or undefined.');
  }

  return object;
}

function isTruthy<T>(object: T): object is Exclude<T, '' | 0 | false | null | undefined> {
  return Boolean(object) === true;
}

function isFalsy(object: unknown): object is '' | 0 | false | null | undefined {
  return Boolean(object) === false;
}

function isNullish(object: unknown): object is null | undefined {
  return object === null || object === undefined;
}

function isNotNullish<T>(object: T): object is Exclude<T, null | undefined> {
  return object !== null && object !== undefined;
}

export { asserted, isTruthy, isFalsy, isNullish, isNotNullish };
