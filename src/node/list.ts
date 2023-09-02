import fs from 'node:fs';
import fsp from 'node:fs/promises';
import path from 'node:path';

interface ListFoldersOpt {
  folderPath: string,
  getFullPath?: boolean,
}

async function listFolders({ folderPath, getFullPath }: ListFoldersOpt): Promise<string[]> {
  if (fs.existsSync(folderPath) === false) {
    throw new Error('The provided folder path does not exist!');
  }

  const items = await fsp.readdir(folderPath, {
    withFileTypes: true,
  });

  const folders = items
    .filter((item) => item.isDirectory() === true)
    .map((folderItem) => {
      if (getFullPath === undefined) {
        return folderItem.name;
      }

      return path.join(folderPath, folderItem.name);
    });

  return folders;
}

export { listFolders };
