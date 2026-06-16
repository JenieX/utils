import { accessSync } from 'node:fs';

function existsSync(path: string): boolean {
  try {
    accessSync(path);

    return true;
  }
  catch {
    return false;
  }
}

export { existsSync };
