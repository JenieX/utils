import inquirer from 'inquirer';

/**
 * Shows the user a list of options to multi-select from.
 */
async function checkbox(message, choices) {
    const { selectedChoices } = await inquirer.prompt([
        {
            type: 'checkbox',
            message,
            name: 'selectedChoices',
            loop: false,
            choices,
            async validate(answer) {
                if (answer.length === 0) {
                    return 'You must choose at least one choice!';
                }
                return true;
            },
        },
    ]);
    return selectedChoices;
}

/**
 * Gets the user confirmation.
 * @param defaultAnswer Defaults to false which is no.
 */
async function confirm(message, defaultAnswer = false) {
    const { confirmValue } = await inquirer.prompt([
        {
            type: 'confirm',
            name: 'confirmValue',
            message,
            default: defaultAnswer,
        },
    ]);
    // Extra checking as if the values are of type `any`.
    if (typeof confirmValue !== 'boolean') {
        throw new TypeError('Something went wrong!');
    }
    return confirmValue;
}

/**
 * Asserts that an object is neither `null` nor `undefined`.
 *
 * If the object is `null` or `undefined`, a `TypeError` is thrown.
 * Otherwise, TypeScript narrows the object to `T`.
 *
 * @template T The type of the object.
 *
 * @param object The object to validate.
 *
 * @throws {TypeError} If the object is `null` or `undefined`.
 *
 * @example
 * const object: string | undefined = Math.random() < 0.5 ? undefined : 'Hello';
 *
 * assert(object);
 *
 * // `object` is now typed as `string`.
 * console.log(object.length);
 */
function isFalsy(object) {
    return Boolean(object) === false;
}

/**
 * Gets the user input if provided, otherwise throws an error.
 */
async function input(message) {
    const { inputValue } = await inquirer.prompt([
        {
            type: 'input',
            name: 'inputValue',
            message,
        },
    ]);
    // Extra checking as if the values are of type `any`.
    if (isFalsy(inputValue) || typeof inputValue !== 'string') {
        throw new Error('No input was provided!');
    }
    return inputValue;
}

/**
 * Shows the user a list of options to select from.
 */
async function list(message, choices) {
    const { selectedChoice } = await inquirer.prompt([
        {
            type: 'list',
            name: 'selectedChoice',
            message,
            choices,
            loop: false,
        },
    ]);
    if (typeof selectedChoice !== 'string' && typeof selectedChoice !== 'number') {
        throw new TypeError('Something went wrong!');
    }
    return selectedChoice;
}

export { checkbox, confirm, input, list };
