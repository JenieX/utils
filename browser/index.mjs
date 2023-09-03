function isString(object) {
    return typeof object === 'string';
}

function ensureJoin(object, separator = ',') {
    if (isString(object)) {
        return object;
    }
    return object.join(separator);
}

function noop() { }

function asserted(object) {
    if (object === null || object === undefined) {
        throw new Error('Value is either null or undefined.');
    }
    return object;
}
function isTruthy(object) {
    return Boolean(object) === true;
}
function isFalsy(object) {
    return Boolean(object) === false;
}
function isNullish(object) {
    return object === null || object === undefined;
}
function isNotNullish(object) {
    return object !== null && object !== undefined;
}

async function sleep(milliSeconds) {
    return new Promise((resolve) => {
        setTimeout(resolve, milliSeconds);
    });
}

const scriptInfo = typeof GM === 'undefined' ? GM_info : GM.info;
const SCRIPT_NAME = scriptInfo.script.name;
/** The identifier of the script to be used in logging */
const LOG_ID = `[${SCRIPT_NAME}]:`;
/** The initial tab URL on the script run */
const TAB_URL = window.location.href;

function alert(message) {
    if (message === undefined) {
        window.alert(`[ ${SCRIPT_NAME} ]`);
        return;
    }
    window.alert(`[ ${SCRIPT_NAME} ]\n\n${message}`);
}
function confirm(message) {
    return window.confirm(`[ ${SCRIPT_NAME} ]\n\n${message}`);
}
function prompt(message, _default) {
    return window.prompt(`[ ${SCRIPT_NAME} ]\n\n${message}`, _default);
}

function $(selectors, parent) {
    const element = (parent ?? document).querySelector(ensureJoin(selectors));
    if (element === null) {
        throw new Error(`Couldn't find the element with the selector ${selectors}`);
    }
    return element;
}
function $$(selectors, parent) {
    const elements = (parent ?? document).querySelectorAll(ensureJoin(selectors));
    if (elements.length === 0) {
        throw new Error(`Couldn't find any element with the selector ${selectors}`);
    }
    return elements;
}

function createFlagMessage(flag) {
    const { message: messageHeader, values, type } = flag;
    let message = messageHeader;
    if (values !== undefined) {
        message += `\n\n${values.join(' | ')}`;
    }
    if (type === 'number' && flag.range !== undefined) {
        message += '\n';
        const [min, max] = flag.range;
        if (min !== undefined) {
            message += `\nMinimum: ${min}`;
        }
        if (max !== undefined) {
            message += `\nMaximum: ${max}`;
        }
    }
    return message;
}

function validateFlagValue(flag, promptValue) {
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

function processFlag(flag) {
    const message = createFlagMessage(flag);
    const promptValue = prompt(message, flag.default?.toString());
    return [flag.name, validateFlagValue(flag, promptValue)];
}
async function getOptions(flags) {
    const options = {};
    for (const flag of flags) {
        const [name, value] = processFlag(flag);
        options[name] = value;
        await sleep(300);
    }
    return options;
}

export { $, $$, LOG_ID, SCRIPT_NAME, TAB_URL, alert, asserted, confirm, ensureJoin, getOptions, isFalsy, isNotNullish, isNullish, isString, isTruthy, noop, prompt, sleep };
