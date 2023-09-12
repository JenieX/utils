import { isString } from './is';

function ensureJoin(object: string[] | string, separator = ','): string {
  if (isString(object)) {
    return object;
  }

  return object.join(separator);
}

export { ensureJoin };
