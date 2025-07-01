import fs from 'node:fs';
import path from 'node:path';
import { ListFoldersOpt } from './types';

/**
 * Lists the folders that are present in the provided folder path.
 * @throws an error if the provided folder path does not exist.
 *
 * @category File-System
 */
function listFoldersSync({ folderPath, getFullPath }: ListFoldersOpt): string[] {
  if (fs.existsSync(folderPath) === false) {
    throw new Error('The provided folder path does not exist!');
  }

  const entries = fs.readdirSync(folderPath, {
    withFileTypes: true,
  });

  const folders = entries
    .filter((entry) => entry.isDirectory() === true)
    .map((folderEntry) => {
      if (getFullPath === true) {
        return path.join(folderPath, folderEntry.name);
      }

      return folderEntry.name;
    });

  return folders;
}

export { listFoldersSync };
