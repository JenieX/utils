import inquirer from 'inquirer';

/**
 * Gets the user confirmation.
 * @param defaultAnswer Defaults to false which is no.
 */
async function confirm(message: string, defaultAnswer = false): Promise<boolean> {
  const { confirmValue } = await inquirer.prompt([
    {
      type: 'confirm',
      name: 'confirmValue',
      message,
      default: defaultAnswer,
    },
  ]) as Record<string, boolean>;

  // Extra checking as if the values are of type `any`.
  if (typeof confirmValue !== 'boolean') {
    throw new TypeError('Something went wrong!');
  }

  return confirmValue;
}

export { confirm };
