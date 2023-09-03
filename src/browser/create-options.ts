import { Flag } from './types';
import { prompt } from './dialogs';
import { sleep } from '../common';

type FlagValue = boolean | number | string;
type Options = Record<string, FlagValue>;

function handleFlag(flag: Flag): [string, FlagValue] {
  const { type, name, message: header, values, default: defaultValue } = flag;

  let message = header;

  if (values !== undefined) {
    message += `\n\n${values.join(' | ')}`;
  }

  if (type === 'number' && flag.range !== undefined) {
    message += '\n';

    const [min, max] = flag.range ?? [];

    if (min !== undefined) {
      message += `\nMinimum: ${min}`;
    }

    if (max !== undefined) {
      message += `\nMaximum: ${max}`;
    }
  }

  const flagValue = prompt(message, defaultValue.toString());

  if (flagValue === null || flagValue === '') {
    throw new Error(`You did not provide a value for "${name}" option.`);
  }

  switch (type) {
    case 'boolean': {
      if (flagValue !== 'yes' && flagValue !== 'no') {
        throw new Error(`Invalid value for "${name}" option!`);
      }

      return [name, flagValue === 'yes'];
    }

    case 'string': {
      if (values !== undefined && !values.includes(flagValue)) {
        throw new Error(`Provided value for "${name}" option is not in the list.`);
      }

      return [name, flagValue];
    }

    case 'number': {
      const [min, max] = flag.range ?? [];
      const flagValueAsNumber = Number(flagValue);

      if (Number.isNaN(flagValueAsNumber)) {
        throw new TypeError(`You need to provide a number for "${name}" option!`);
      }

      if (values !== undefined && !values.includes(flagValueAsNumber)) {
        throw new Error(`Provided value for "${name}" option is not in the list.`);
      }

      if (min !== undefined && flagValueAsNumber < min) {
        throw new Error(`Provided value for "${name}" option is less than the minimum.`);
      }

      if (max !== undefined && flagValueAsNumber > max) {
        throw new Error(`Provided value for "${name}" option is greater than the maximum.`);
      }

      return [name, flagValueAsNumber];
    }
  }

  throw new Error('Something went wrong while handling a flag');
}

async function createOptions(flags: Flag[]): Promise<Options> {
  const options: Options = {};

  for (const flag of flags) {
    const [name, value] = handleFlag(flag);
    options[name] = value;

    await sleep(300);
  }

  return options;
}

export default createOptions;
