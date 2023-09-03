import { Flag, FlagValue } from './types';

function validateFlagValue(flag: Flag, promptValue: string | null): FlagValue {
  const { type, name, values } = flag;

  if (promptValue === null || promptValue === '') {
    throw new Error(`You did not provide a value for "${name}" option.`);
  }

  switch (type) {
    case 'boolean': {
      if (promptValue !== 'yes' && promptValue !== 'no') {
        throw new Error(`Invalid value for "${name}" option!`);
      }

      return promptValue === 'yes';
    }

    case 'string': {
      if (values !== undefined && !values.includes(promptValue)) {
        throw new Error(`Provided value for "${name}" option is not in the list.`);
      }

      return promptValue;
    }

    case 'number': {
      const promptValueAsNumber = Number(promptValue);

      if (Number.isNaN(promptValueAsNumber)) {
        throw new TypeError(`You need to provide a number for "${name}" option!`);
      }

      if (values !== undefined && !values.includes(promptValueAsNumber)) {
        throw new Error(`Provided value for "${name}" option is not in the list.`);
      }

      const [min, max] = flag.range ?? [];

      if (min !== undefined && promptValueAsNumber < min) {
        throw new Error(`Provided value for "${name}" option is less than the minimum.`);
      }

      if (max !== undefined && promptValueAsNumber > max) {
        throw new Error(`Provided value for "${name}" option is greater than the maximum.`);
      }

      return promptValueAsNumber;
    }

    default: {
      throw new Error(`Unsupported flag type for "${name}" option.`);
    }
  }
}

export default validateFlagValue;
