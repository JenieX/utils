import createFlagMessage from './create-flag-message';
import validateFlagValue from './validate-flag-value';
import { Flag, FlagValue, Options } from './types';
import { prompt } from '../dialogs';
import { sleep } from '../../common';

function processFlag(flag: Flag): [string, FlagValue] {
  const message = createFlagMessage(flag);
  const promptValue = prompt(message, flag.default?.toString());

  return [flag.name, validateFlagValue(flag, promptValue)];
}

async function getOptions(flags: Flag[]): Promise<Options> {
  const options: Options = {};

  for (const flag of flags) {
    const [name, value] = processFlag(flag);
    options[name] = value;

    await sleep(300);
  }

  return options;
}

export type { Flag } from './types';

export default getOptions;
