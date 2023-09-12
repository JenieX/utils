/**
 * A wrapper around `setTimeout`.
 *
 * @category Promise
 */
async function sleep(milliSeconds: number): Promise<void> {
  return new Promise<void>((resolve) => {
    setTimeout(resolve, milliSeconds);
  });
}

export { sleep };
