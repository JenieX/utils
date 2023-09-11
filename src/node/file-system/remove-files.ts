import fsp from 'node:fs/promises';
import path from 'node:path';
import listFiles from './list-files';
import { RemoveFilesOpt } from './types';

async function removeFiles({ folderPath, filter }: RemoveFilesOpt): Promise<void> {
  const nestedFilePathPattern = `${path.resolve('./')}\\`;

  if (!folderPath.startsWith(nestedFilePathPattern)) {
    throw new Error('Files are outside or at the root of the project folder.');
  }

  const filesPaths = await listFiles({ folderPath, getFullPath: true, filter });

  for (const filePath of filesPaths) {
    await fsp.unlink(filePath);
  }
}

export default removeFiles;
