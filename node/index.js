import fs from 'node:fs';
import fsp from 'node:fs/promises';
import path from 'node:path';

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
function stringOrThrow(value) {
    if (!isString(value)) {
        throw new Error('Expected a string.');
    }
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

/**
 * Lists the files that are present in the provided folder path.
 * @throws an error if the provided folder path does not exist.
 *
 * @category File-System
 */
async function listFiles({ folderPath, getFullPath, filter }) {
    if (fs.existsSync(folderPath) === false) {
        throw new Error('The provided folder path does not exist!');
    }
    const entries = await fsp.readdir(folderPath, {
        withFileTypes: true,
    });
    const files = entries
        .filter((entry) => entry.isDirectory() === false)
        .map((fileEntry) => {
        if (getFullPath === true) {
            return path.join(folderPath, fileEntry.name);
        }
        return fileEntry.name;
    });
    if (filter === undefined) {
        return files;
    }
    return files.filter((fileName) => {
        const fileExtension = path.extname(fileName);
        return filter.includes(fileExtension);
    });
}

/**
 * Lists the folders that are present in the provided folder path.
 * @throws an error if the provided folder path does not exist.
 *
 * @category File-System
 */
async function listFolders({ folderPath, getFullPath }) {
    if (fs.existsSync(folderPath) === false) {
        throw new Error('The provided folder path does not exist!');
    }
    const entries = await fsp.readdir(folderPath, {
        withFileTypes: true,
    });
    const folders = entries
        .filter((entry) => entry.isDirectory() === true)
        .map((folderEntry) => {
        if (getFullPath === true) {
            return path.join(folderPath, folderEntry.name);
        }
        return folderEntry.name;
    });
    return folders;
}

/**
 * Lists the folders that are present in the provided folder path.
 * @throws an error if the provided folder path does not exist.
 *
 * @category File-System
 */
function listFoldersSync({ folderPath, getFullPath }) {
    if (fs.existsSync(folderPath) === false) {
        throw new Error('The provided folder path does not exist!');
    }
    const entries = fs.readdirSync(folderPath, {
        withFileTypes: true,
    });
    const folders = entries
        .filter((entry) => entry.isDirectory() === true)
        .map((folderEntry) => {
        if (getFullPath === true) {
            return path.join(folderPath, folderEntry.name);
        }
        return folderEntry.name;
    });
    return folders;
}

/**
 * Removes the files that are present in the provided folder path.
 * @throws an error if the provided folder path does not exist.
 * @throws an error if the files are outside or at the root of the project folder.
 *
 * @category File-System
 */
async function removeFiles({ folderPath, filter }) {
    const nestedFilePathPattern = `${path.resolve('./')}\\`;
    if (!folderPath.startsWith(nestedFilePathPattern)) {
        throw new Error('Files are outside or at the root of the project folder.');
    }
    const filesPaths = await listFiles({ folderPath, getFullPath: true, filter });
    for (const filePath of filesPaths) {
        await fsp.unlink(filePath);
    }
}

async function readJSON(filePath, withComments = false) {
    const stringJSON = await fsp.readFile(filePath, 'utf-8');
    if (withComments === true) {
        try {
            const { default: JSON5 } = await import('json5');
            return JSON5.parse(stringJSON);
        }
        catch (exception) {
            throw new Error(exception.message);
        }
    }
    return JSON.parse(stringJSON);
}

function createRequest(transport, url, options) {
    const getResponse = async () => {
        return transport(url, options);
    };
    return {
        response: async () => {
            return getResponse();
        },
        blob: async () => {
            const response = await getResponse();
            return response.blob();
        },
        buffer: async () => {
            const response = await getResponse();
            return response.arrayBuffer();
        },
        json: async () => {
            const response = await getResponse();
            return response.json();
        },
        text: async () => {
            const response = await getResponse();
            return response.text();
        },
        document: async () => {
            const response = await getResponse();
            const responseText = await response.text();
            const parser = new DOMParser();
            return parser.parseFromString(responseText, 'text/html');
        },
        multi: async (types) => {
            const response = await getResponse();
            const responses = { response };
            if (types.includes('blob')) {
                responses.blob = await response.clone().blob();
            }
            if (types.includes('buffer')) {
                responses.buffer = await response.clone().arrayBuffer();
            }
            if (types.includes('json')) {
                responses.json = (await response.clone().json());
            }
            if (types.includes('text')) {
                responses.text = await response.clone().text();
            }
            if (types.includes('document')) {
                const responseText = await response.clone().text();
                const parser = new DOMParser();
                responses.document = parser.parseFromString(responseText, 'text/html');
            }
            return responses;
        },
    };
}

function isFileURL(url) {
    return url.startsWith('file:///');
}

async function fetchTransport(url, options) {
    const response = await fetch(url, options);
    if (!response.ok && !isFileURL(response.url)) {
        throw new Error(`Request to ${response.url} ended with ${response.status} status.`);
    }
    return response;
}

function rq(url, options) {
    return createRequest(fetchTransport, url, options);
}

export { asserted, capitalize, isBoolean, isFalsy, isFunction, isNotNullish, isNullish, isNumber, isObject, isString, isTruthy, join, listFiles, listFolders, listFoldersSync, noop, padZeros, readJSON, remove, removeFiles, rq, createRequest as rqc, sleep, stringOrThrow, toString };
