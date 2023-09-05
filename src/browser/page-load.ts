/**
 * Waits for the page to load.
 * @param completely Whether or not to wait for resources to load as well.
 */
async function pageLoad(completely: boolean): Promise<void> {
  return new Promise((resolve) => {
    if (document.readyState === 'complete') {
      resolve();

      return;
    }

    if (completely === true) {
      window.addEventListener('load', () => resolve());

      return;
    }

    document.addEventListener('DOMContentLoaded', () => resolve());
  });
}

export default pageLoad;
