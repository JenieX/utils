import inquirer from 'inquirer';
import { ListChoice } from './types';

/**
 * Shows the user a list of options to select from.
 */
async function list(message: string, choices: (ListChoice)[]): Promise<ListChoice> {
  const { selectedChoice } = await inquirer.prompt([
    {
      type: 'list',
      name: 'selectedChoice',
      message,
      choices,
      loop: false,
    },
  ]) as Record<string, ListChoice>;

  if (typeof selectedChoice !== 'string' && typeof selectedChoice !== 'number') {
    throw new TypeError('Something went wrong!');
  }

  return selectedChoice;
}

export { list };
