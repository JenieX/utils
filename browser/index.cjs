'use strict';

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

/**
 * Adds leading zeros to a number.
 *
 * @category String
 */
function padZeros(number, length) {
    if (Math.abs(number).toString().length > length) {
        throw new Error('Provided length can not be less than the digits of the number.');
    }
    if (number < 0) {
        throw new Error('Provided number must be greater than zero.');
    }
    const padded = '0'.repeat(length - 1) + number;
    if (number < 10) {
        return padded;
    }
    return padded.slice(-length);
}

const lowercaseWords = new Set([
    'a', 'an', 'the',
    'and', 'but', 'for', 'nor', 'or', 'so', 'yet',
    'about', 'across', 'after', 'along', 'among', 'around', 'as', 'at', 'before', 'between', 'by', 'during', 'in', 'into', 'of', 'on', 'over', 'since', 'through', 'throughout', 'to', 'under', 'with', 'within',
    'away', 'back', 'down', 'far', 'off', 'on', 'out', 'up',
    'he', 'her', 'him', 'his', 'it', 'its', 'me', 'my', 'our', 'she', 'their', 'them', 'they', 'us', 'we', 'you', 'your',
]);
function capitalizeWord(word) {
    return word[0].toUpperCase() + word.slice(1).toLowerCase();
}
/**
 * capitalizes a word or a sentence.
 *
 * @category String
 */
function capitalize(sentence) {
    if (sentence.includes(' ')) {
        return sentence.split(' ').map((word, index) => {
            const lowercaseWord = word.toLowerCase();
            if (index > 0 && lowercaseWords.has(lowercaseWord)) {
                return lowercaseWord;
            }
            return capitalizeWord(word);
        }).join(' ');
    }
    return capitalizeWord(sentence);
}

const scriptName = GM.info.script.name;
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
    if (!response.ok && !response.url.startsWith('file:///')) {
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
                const isFileURL = finalUrl.startsWith('file:///');
                const ok = status >= 200 && status < 300;
                if (!ok && !isFileURL) {
                    reject(new Error(`Request to ${url} ended with ${status} status.`));
                    return;
                }
                const properResponse = new Response(response, {
                    statusText,
                    status: isFileURL ? 200 : status,
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
        throw new Error(`Could not find the element with the selector ${selectors}`);
    }
    return element;
}
function $$(selectors, parent) {
    const elements = (parent ?? document).querySelectorAll(join(selectors));
    if (elements.length === 0) {
        throw new Error(`Could not find any element with the selector ${selectors}`);
    }
    return elements;
}

/**
 * @param key The name of the param in the search query.
 * @param fullURL If provided, it will be our target, otherwise it is the current location.
 */
function getSearchParam(key, fullURL) {
    const { searchParams } = new URL(fullURL ?? window.location.href);
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
/**
 * @param keys The names of the param in the search query.
 * @param fullURL If provided, it will be our target, otherwise it is the current location.
 */
function removeSearchParams(keys, fullURL) {
    const updatedURL = [];
    const { origin, pathname, search, hash } = new URL(fullURL ?? window.location.href);
    const searchParams = new URLSearchParams(search);
    for (const key of keys) {
        searchParams.delete(key);
    }
    updatedURL.push(origin, pathname);
    if (searchParams.toString() !== '') {
        updatedURL.push('?', searchParams.toString());
    }
    if (hash !== '') {
        updatedURL.push(hash);
    }
    return updatedURL.join('');
}

/**
 * Checks if the VPN is active by accessing the router address.
 * Tested on Opera browser build-in VPN only.
 */
async function checkVPN() {
    let pass = false;
    try {
        await fishXResponse('http://192.168.1.1/index.html', { method: 'HEAD' });
    }
    catch (exception) {
        if (exception.message.includes('ended with 0 status')) {
            pass = true;
        }
    }
    if (pass === false) {
        throw new Error('VPN is not enabled!');
    }
}
async function checkVPNRandomly() {
    // a 1/10 chance to check.
    if (Math.floor(Math.random() * 10) === 0) {
        await checkVPN();
        console.log('%cPass check for VPN!', 'color: #04da79');
    }
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

function saveFile(blob, fileName) {
    const blobURL = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = blobURL;
    link.download = fileName;
    link.dispatchEvent(new MouseEvent('click'));
    window.setTimeout(() => window.URL.revokeObjectURL(blobURL), 1000);
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

exports.$ = $;
exports.$$ = $$;
exports.addStyle = addStyle;
exports.alert = alert;
exports.asserted = asserted;
exports.capitalize = capitalize;
exports.checkVPN = checkVPN;
exports.checkVPNRandomly = checkVPNRandomly;
exports.confirm = confirm;
exports.fish = fish;
exports.fishResponse = fishResponse;
exports.fishX = fishX;
exports.fishXResponse = fishXResponse;
exports.getOptions = getOptions;
exports.getSearchParam = getSearchParam;
exports.imageLoad = imageLoad;
exports.isBoolean = isBoolean;
exports.isFalsy = isFalsy;
exports.isFunction = isFunction;
exports.isNotNullish = isNotNullish;
exports.isNullish = isNullish;
exports.isNumber = isNumber;
exports.isObject = isObject;
exports.isString = isString;
exports.isTruthy = isTruthy;
exports.join = join;
exports.logId = logId;
exports.noop = noop;
exports.padZeros = padZeros;
exports.pageLoad = pageLoad;
exports.prompt = prompt;
exports.remove = remove;
exports.removeSearchParams = removeSearchParams;
exports.saveFile = saveFile;
exports.scriptName = scriptName;
exports.setSearchParam = setSearchParam;
exports.sleep = sleep;
exports.tabURL = tabURL;
exports.toString = toString;
