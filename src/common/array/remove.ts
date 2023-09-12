/**
 * Removes an item from an array by mutating it.
 * @throws An error if the object to be removed does not exist inside the array.
 *
 * @category Array
 */
function remove<T>(array: T[], object: T): void {
  const index = array.indexOf(object);

  if (index === -1) {
    throw new Error('Provided value does not exist inside the array.');
  }

  array.splice(index, 1);
}

export default remove;
