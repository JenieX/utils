import fsp from 'node:fs/promises';

async function readJSON<T = object>(filePath: string, withComments = false): Promise<T> {
  const stringJSON = await fsp.readFile(filePath, 'utf-8');

  if (withComments === true) {
    try {
      const { default: JSON5 } = await import('json5');

      return JSON5.parse(stringJSON) as T;
    } catch (exception) {
      throw new Error((exception as Error).message);
    }
  }

  return JSON.parse(stringJSON) as T;
}

export default readJSON;
