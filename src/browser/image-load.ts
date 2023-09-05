/**
 * Waits for image to fully load or throws an error if it failed.
 */
async function imageLoad(img: HTMLImageElement): Promise<void> {
  return new Promise<void>((resolve, reject) => {
    if (img.complete) {
      resolve();

      return;
    }

    let onLoad: () => void;
    let onError: () => void;

    const removeListeners = (): void => {
      img.removeEventListener('load', onLoad);
      img.removeEventListener('error', onError);
    };

    onLoad = (): void => {
      removeListeners();
      resolve();
    };

    onError = (): void => {
      removeListeners();
      reject(new Error('Image failed to load'));
    };

    img.addEventListener('load', onLoad);
    img.addEventListener('error', onError);
  });
}

export default imageLoad;
