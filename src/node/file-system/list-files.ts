import fs from 'node:fs';
import fsp from 'node:fs/promises';
import path from 'node:path';
import { ListFilesOpt } from './types';

/**
 * Lists the files that are present in the provided folder path.
 * @throws an error if the provided folder path does not exist.
 *
 * @category File-System
 */
async function listFiles({ folderPath, getFullPath, filter }: ListFilesOpt): Promise<string[]> {
  if (fs.existsSync(folderPath) === false) {
    throw new Error('The provided folder path does not exist!');
  }

  const entries = await fsp.readdir(folderPath, {
    withFileTypes: true,
  });

  const files = entries
    .filter((entry) => entry.isDirectory() === false)
    .map((fileEntry) => {
      if (getFullPath === true) {
        return path.join(folderPath, fileEntry.name);
      }

      return fileEntry.name;
    });

  if (filter === undefined) {
    return files;
  }

  return files.filter((fileName) => {
    const fileExtension = path.extname(fileName);

    return filter.includes(fileExtension);
  });
}

export { listFiles };
