import { isString } from '../is';

/**
 * Joins an array's items or do nothing if it is joined already.
 *
 * @category Array
 */
function join(object: string[] | string, separator = ','): string {
  if (isString(object)) {
    return object;
  }

  return object.join(separator);
}

export { join };
