function asserted<T>(object: T | null | undefined): T {
  if (object === null || object === undefined) {
    throw new Error('Value is either null or undefined');
  }

  return object;
}

function isTruthy<T>(object: T): object is NonNullable<T> {
  return Boolean(object);
}

export { asserted, isTruthy };
