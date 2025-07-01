import inquirer from 'inquirer';
import { CheckboxChoice, CheckboxValue } from './types';

/**
 * Shows the user a list of options to multi-select from.
 */
async function checkbox(message: string, choices: CheckboxChoice[]): Promise<CheckboxValue[]> {
  const { selectedChoices } = await inquirer.prompt([
    {
      type: 'checkbox',
      message,
      name: 'selectedChoices',
      loop: false,
      choices,
      async validate(answer: any[]): Promise<boolean | string> {
        if (answer.length === 0) {
          return 'You must choose at least one choice!';
        }

        return true;
      },
    },
  ]) as Record<string, CheckboxValue[]>;

  return selectedChoices!;
}

export { checkbox };
