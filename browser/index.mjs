// @ts-nocheck

function isString(object) {
    return typeof object === 'string';
}

function ensureJoin(object, separator = ',') {
    if (isString(object)) {
        return object;
    }
    return object.join(separator);
}

function asserted(object) {
    if (object === null || object === undefined) {
        throw new Error('Value is either null or undefined');
    }
    return object;
}
function isTruthy(object) {
    return Boolean(object);
}

async function sleep(milliSeconds) {
    return new Promise((resolve) => {
        setTimeout(resolve, milliSeconds);
    });
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

export { $, $$, asserted, ensureJoin, isString, isTruthy, sleep };
