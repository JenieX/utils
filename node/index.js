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
 * @throws An error if the object to be removed does not exist inside the array.
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
 * Get a list of files that are present in the provided folder path.
 * If the provided folder path does not exists, it will return an empty array.
 */
async function listFiles({ folderPath, getFullPath, filter }) {
    if (fs.existsSync(folderPath) === false) {
        return [];
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
 * Get a list of folders that are present in the provided folder path.
 * If the provided folder path does not exists, an error will be thrown.
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
 * Get a list of folders that are present in the provided folder path.
 * If the provided folder path does not exists, an error will be thrown.
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

export { asserted, isBoolean, isFalsy, isFunction, isNotNullish, isNullish, isNumber, isObject, isString, isTruthy, join, listFiles, listFolders, listFoldersSync, noop, readJSON, remove, removeFiles, sleep, toString };
