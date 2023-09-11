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
