import { stat } from 'node:fs/promises';

async function existsFile(path: string): Promise<boolean> {
  try {
    const stats = await stat(path);

    return stats.isFile();
  }
  catch {
    return false;
  }
}

export { existsFile };
