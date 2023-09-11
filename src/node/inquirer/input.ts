import inquirer from 'inquirer';
import { isFalsy } from '../../common';

/**
 * Gets the user input if provided, otherwise throws an error.
 */
export async function input(message: string): Promise<string> {
  const { inputValue } = await inquirer.prompt([
    {
      type: 'input',
      name: 'inputValue',
      message,
    },
  ]) as Record<string, string>;

  // Extra checking as if the values are of type `any`.
  if (isFalsy(inputValue) || typeof inputValue !== 'string') {
    throw new Error('No input was provided!');
  }

  return inputValue;
}

export default input;
