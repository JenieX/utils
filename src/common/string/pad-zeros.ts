/**
 * Adds leading zeros to a number.
 *
 * @category String
 */
function padZeros(number: number, length: number): string {
  if (Math.abs(number).toString().length > length) {
    throw new Error('Provided length can not be less than the digits of the number.');
  }

  if (number < 0) {
    throw new Error('Provided number must be greater than zero.');
  }

  const padded = '0'.repeat(length - 1) + number;

  if (number < 10) {
    return padded;
  }

  return padded.slice(-length);
}

export { padZeros };
