function noop() { }
function toString(object) {
    return Object.prototype.toString.call(object);
}

function isString(object) {
    return typeof object === 'string';
}
function isNumber(object) {
    return typeof object === 'number';
}
function isBoolean(object) {
    return typeof object === 'boolean';
}
function isObject(object) {
    return toString(object) === '[object Object]';
}
// eslint-disable-next-line @typescript-eslint/ban-types
function isFunction(object) {
    return typeof object === 'function';
}

/**
 * Joins an array's items or do nothing if it is joined already.
 *
 * @category Array
 */
function join(object, separator = ',') {
    if (isString(object)) {
        return object;
    }
    return object.join(separator);
}

/**
 * Removes an item from an array by mutating it.
 * @throws an error if the object to be removed does not exist inside the array.
 *
 * @category Array
 */
function remove(array, object) {
    const index = array.indexOf(object);
    if (index === -1) {
        throw new Error('Provided value does not exist inside the array.');
    }
    array.splice(index, 1);
}

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

/**
 * A wrapper around `setTimeout`.
 *
 * @category Promise
 */
async function sleep(milliSeconds) {
    return new Promise((resolve) => {
        setTimeout(resolve, milliSeconds);
    });
}

let infoObject;
if (typeof GM !== 'undefined') {
    infoObject = GM.info;
    // eslint-disable-next-line unicorn/no-negated-condition
}
else if (typeof GM_info !== 'undefined') {
    infoObject = GM_info;
}
else {
    infoObject = { script: { name: document.title } };
}
const scriptName = infoObject.script.name;
/** The identifier of the script to be used in logging. */
const logId = `[${scriptName}]:`;
/** The initial tab URL on the script run. */
const tabURL = window.location.href;

function alert(message) {
    if (message === undefined) {
        window.alert(`[ ${scriptName} ]`);
        return;
    }
    window.alert(`[ ${scriptName} ]\n\n${message}`);
}
function confirm(message) {
    return window.confirm(`[ ${scriptName} ]\n\n${message}`);
}
function prompt(message, _default) {
    return window.prompt(`[ ${scriptName} ]\n\n${message}`, _default);
}

async function fishResponse(url, options) {
    const response = await fetch(url, options);
    if (!response.ok) {
        throw new Error(`Request to ${response.url} ended with ${response.status} status.`);
    }
    return response;
}

// Note: to set the 'cookie' header, you have to set 'anonymous' to true.
async function fishXResponse(url, fishOptions) {
    const { method, anonymous, headers, body, timeOut, onProgress } = fishOptions ?? {};
    return new Promise((resolve, reject) => {
        GM.xmlHttpRequest({
            url,
            method: method ?? 'GET',
            headers,
            anonymous,
            data: body,
            responseType: 'blob',
            timeout: timeOut,
            onprogress: onProgress,
            onload({ response, statusText, status, finalUrl }) {
                const ok = status >= 200 && status < 300;
                if (!ok) {
                    reject(new Error(`Request to ${url} ended with ${status} status.`));
                    return;
                }
                const properResponse = new Response(response, {
                    statusText,
                    status,
                });
                Object.defineProperty(properResponse, 'url', { value: finalUrl });
                resolve(properResponse);
            },
            onerror({ status }) {
                reject(new Error(`Request to ${url} ended with ${status} status.`));
            },
        });
    });
}

async function fishBlob(url, options, x) {
    const response = await (x ? fishXResponse : fishResponse)(url, options);
    return response.blob();
}

async function fishBuffer(url, options, x) {
    const response = await (x ? fishXResponse : fishResponse)(url, options);
    return response.arrayBuffer();
}

async function fishDocument(url, options, x) {
    const response = await (x ? fishXResponse : fishResponse)(url, options);
    const responseText = await response.text();
    const parser = new DOMParser();
    return parser.parseFromString(responseText, 'text/html');
}

async function fishJSON(url, options, x) {
    const response = await (x ? fishXResponse : fishResponse)(url, options);
    return response.json();
}

async function fishText(url, options, x) {
    const response = await (x ? fishXResponse : fishResponse)(url, options);
    return response.text();
}

// https://httpbin.org/anything
const fish = {
    blob: async (url, options) => fishBlob(url, options),
    buffer: async (url, options) => fishBuffer(url, options),
    document: async (url, options) => fishDocument(url, options),
    JSON: async (url, options) => fishJSON(url, options),
    text: async (url, options) => fishText(url, options),
};
const fishX = {
    blob: async (url, options) => fishBlob(url, options, true),
    buffer: async (url, options) => fishBuffer(url, options, true),
    document: async (url, options) => fishDocument(url, options, true),
    JSON: async (url, options) => fishJSON(url, options, true),
    text: async (url, options) => fishText(url, options, true),
};

function $(selectors, parent) {
    const element = (parent ?? document).querySelector(join(selectors));
    if (element === null) {
        throw new Error(`Couldn't find the element with the selector ${selectors}`);
    }
    return element;
}
function $$(selectors, parent) {
    const elements = (parent ?? document).querySelectorAll(join(selectors));
    if (elements.length === 0) {
        throw new Error(`Couldn't find any element with the selector ${selectors}`);
    }
    return elements;
}

/**
 * @param key The name of the param in the search query.
 * @param fullURL If provided, it will be our target, otherwise it is the current location.
 */
function getSearchParam(key, fullURL) {
    const { search } = new URL(fullURL ?? window.location.href);
    const searchParams = new URLSearchParams(search);
    const value = searchParams.get(key);
    if (value === null) {
        return undefined;
    }
    return value;
}
/**
 *
 * @param key The name of the param that is to be in the search query.
 * @param value Its value.
 * @param fullURL If provided, it will be our target, otherwise it is the current location.
 */
function setSearchParam(key, value, fullURL) {
    const updatedURL = [];
    const { origin, pathname, search, hash } = new URL(fullURL ?? window.location.href);
    const searchParams = new URLSearchParams(search);
    searchParams.set(key, value);
    updatedURL.push(origin, pathname, '?', searchParams.toString());
    if (hash !== '') {
        updatedURL.push(hash);
    }
    return updatedURL.join('');
}

function addStyle(css, parent = document.documentElement) {
    const style = document.createElement('style');
    style.setAttribute('type', 'text/css');
    style.textContent = css;
    parent.append(style);
    return style;
}

/**
 * Waits for image to fully load or throws an error if it fails.
 */
async function imageLoad(img) {
    return new Promise((resolve, reject) => {
        if (img.complete) {
            resolve();
            return;
        }
        let onLoad;
        let onError;
        const removeListeners = () => {
            img.removeEventListener('load', onLoad);
            img.removeEventListener('error', onError);
        };
        onLoad = () => {
            removeListeners();
            resolve();
        };
        onError = () => {
            removeListeners();
            reject(new Error('Image failed to load'));
        };
        img.addEventListener('load', onLoad);
        img.addEventListener('error', onError);
    });
}

/**
 * Waits for the page to load.
 * @param completely Whether or not to wait for resources to load as well.
 */
async function pageLoad(completely) {
    return new Promise((resolve) => {
        if (document.readyState === 'complete') {
            resolve();
            return;
        }
        if (completely === true) {
            window.addEventListener('load', () => resolve());
            return;
        }
        document.addEventListener('DOMContentLoaded', () => resolve());
    });
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

export { $, $$, addStyle, alert, asserted, confirm, fish, fishResponse, fishX, fishXResponse, getOptions, getSearchParam, imageLoad, isBoolean, isFalsy, isFunction, isNotNullish, isNullish, isNumber, isObject, isString, isTruthy, join, logId, noop, pageLoad, prompt, remove, scriptName, setSearchParam, sleep, tabURL, toString };
