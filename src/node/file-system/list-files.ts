import fs from 'node:fs';
import fsp from 'node:fs/promises';
import path from 'node:path';
import { ListFilesOpt } from './types';

/**
 * Get a list of files that are present in the provided folder path.
 * If the provided folder path does not exists, it will return an empty array.
 */
async function listFiles({ folderPath, getFullPath, filter }: ListFilesOpt): Promise<string[]> {
  if (fs.existsSync(folderPath) === false) {
    return [];
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

export default listFiles;
