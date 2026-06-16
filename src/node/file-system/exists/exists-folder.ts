import { stat } from 'node:fs/promises';

async function existsFolder(path: string): Promise<boolean> {
  try {
    const stats = await stat(path);

    return stats.isDirectory();
  }
  catch {
    return false;
  }
}

export { existsFolder };
