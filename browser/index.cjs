// @ts-nocheck

'use strict';

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

function handleFlag(flag) {
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
async function createOptions(flags) {
    const options = {};
    for (const flag of flags) {
        const [name, value] = handleFlag(flag);
        options[name] = value;
        await sleep(300);
    }
    return options;
}

exports.$ = $;
exports.$$ = $$;
exports.LOG_ID = LOG_ID;
exports.SCRIPT_NAME = SCRIPT_NAME;
exports.TAB_URL = TAB_URL;
exports.alert = alert;
exports.asserted = asserted;
exports.confirm = confirm;
exports.createOptions = createOptions;
exports.ensureJoin = ensureJoin;
exports.isFalsy = isFalsy;
exports.isNotNullish = isNotNullish;
exports.isNullish = isNullish;
exports.isString = isString;
exports.isTruthy = isTruthy;
exports.noop = noop;
exports.prompt = prompt;
exports.sleep = sleep;
