import { statSync } from 'node:fs';

function existsFolderSync(path: string): boolean {
  try {
    return statSync(path).isDirectory();
  }
  catch {
    return false;
  }
}

export { existsFolderSync };
