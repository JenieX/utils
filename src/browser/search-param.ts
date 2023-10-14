/**
 * @param key The name of the param in the search query.
 * @param fullURL If provided, it will be our target, otherwise it is the current location.
 */
function getSearchParam(key: string, fullURL?: string): string | undefined {
  const { search } = new URL(fullURL ?? window.location.href);
  const searchParams = new URLSearchParams(search);
  const value = searchParams.get(key);
  if (value === null) {
    return undefined;
  }

  return value;
}

/**
 *
 * @param key The name of the param that is to be in the search query.
 * @param value Its value.
 * @param fullURL If provided, it will be our target, otherwise it is the current location.
 */
function setSearchParam(key: string, value: string, fullURL?: string): string {
  const updatedURL: string[] = [];
  const { origin, pathname, search, hash } = new URL(fullURL ?? window.location.href);
  const searchParams = new URLSearchParams(search);

  searchParams.set(key, value);

  updatedURL.push(origin, pathname, '?', searchParams.toString());

  if (hash !== '') {
    updatedURL.push(hash);
  }

  return updatedURL.join('');
}

/**
 * @param keys The names of the param in the search query.
 * @param fullURL If provided, it will be our target, otherwise it is the current location.
 */
function removeSearchParams(keys: string[], fullURL?: string): string {
  const updatedURL: string[] = [];
  const { origin, pathname, search, hash } = new URL(fullURL ?? window.location.href);
  const searchParams = new URLSearchParams(search);

  for (const key of keys) {
    searchParams.delete(key);
  }

  updatedURL.push(origin, pathname);

  if (searchParams.toString() !== '') {
    updatedURL.push('?', searchParams.toString());
  }

  if (hash !== '') {
    updatedURL.push(hash);
  }

  return updatedURL.join('');
}

export { getSearchParam, setSearchParam, removeSearchParams };
