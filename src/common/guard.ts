/**
 * Asserts that an object is neither `null` nor `undefined`.
 *
 * If the object is `null` or `undefined`, a `TypeError` is thrown.
 * Otherwise, TypeScript narrows the object to `T`.
 *
 * @template T The type of the object.
 *
 * @param object The object to validate.
 *
 * @throws {TypeError} If the object is `null` or `undefined`.
 *
 * @example
 * const object: string | undefined = Math.random() < 0.5 ? undefined : 'Hello';
 *
 * assert(object);
 *
 * // `object` is now typed as `string`.
 * console.log(object.length);
 */
function assert<T>(object: T | null | undefined): asserts object is T {
  if (object === null || object === undefined) {
    throw new TypeError('object is either null or undefined');
  }
}

/**
 * Asserts that an object satisfies the given type guard.
 *
 * If the type guard returns `false`, a `TypeError` is thrown.
 * Otherwise, TypeScript narrows the object to the type accepted by
 * the type guard.
 *
 * @template T The type checked by the type guard.
 *
 * @param object The object to validate.
 * @param guard A type guard used to validate the object.
 *
 * @throws {TypeError} If the object does not satisfy the type guard.
 *
 * @example
 * const object: number | string = Math.random() < 0.5 ? 1 : 'Hello';
 *
 * assertType(object, isNumber);
 *
 * // `object` is now typed as `number`.
 * console.log(object.toFixed(2));
 *
 * @example
 * const object: unknown = 'hello';
 *
 * assertType(object, isString);
 *
 * // `object` is now typed as `string`.
 * console.log(object.toUpperCase());
 */
function assertType<T>(
  object: unknown,
  guard: (object: unknown) => object is T,
): asserts object is T {
  if (!guard(object)) {
    throw new TypeError('object has an invalid type');
  }
}

/**
 * Asserts that an object is neither `null` nor `undefined` and returns it.
 *
 * If the object is `null` or `undefined`, a `TypeError` is thrown.
 * Otherwise, the object is returned with its type narrowed to `T`.
 *
 * @template T The type of the object.
 *
 * @param object The object to validate.
 *
 * @returns The validated object, narrowed to `T`.
 *
 * @throws {TypeError} If the object is `null` or `undefined`.
 *
 * @example
 * const object: string | undefined = Math.random() < 0.5 ? undefined : 'Hello';
 *
 * const string = asserted(object);
 *
 * // `object` is now typed as `string`.
 * console.log(string.length);
 */
function asserted<T>(object: T | null | undefined): T {
  if (object === null || object === undefined) {
    throw new TypeError('object is either null or undefined');
  }

  return object;
}

/**
 * Asserts that an object satisfies the given type guard and returns it
 * with the narrowed type.
 *
 * If the type guard returns `false`, a `TypeError` is thrown.
 *
 * @template T The type checked by the type guard.
 *
 * @param object The object to validate.
 * @param guard A type guard used to validate the object.
 *
 * @returns The validated object, narrowed to `T`.
 *
 * @throws {TypeError} If the object does not satisfy the type guard.
 *
 * @example
 * const object: number | string = Math.random() < 0.5 ? 1 : 'Hello';
 *
 * const number = assertedType(object, isNumber);
 *
 * // `number` is typed as `number`.
 * console.log(number.toFixed(2));
 *
 * @example
 * const object: unknown = 'hello';
 *
 * const text = assertedType(object, isString);
 *
 * // `text` is typed as `string`.
 * console.log(text.toUpperCase());
 */
function assertedType<T>(
  object: unknown,
  guard: (object: unknown) => object is T,
): T {
  if (!guard(object)) {
    throw new TypeError('object has an invalid type');
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

export {
  assert,
  assertType,
  asserted,
  assertedType,
  isFalsy,
  isNotNullish,
  isNullish,
  isTruthy,
};
