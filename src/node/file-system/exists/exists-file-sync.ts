import { statSync } from 'node:fs';

function existsFileSync(path: string): boolean {
  try {
    return statSync(path).isFile();
  }
  catch {
    return false;
  }
}

export { existsFileSync };
