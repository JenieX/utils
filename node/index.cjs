// @ts-nocheck

'use strict';

var fs = require('node:fs');
var fsp = require('node:fs/promises');
var path = require('node:path');

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

async function listFolders({ folderPath, getFullPath }) {
    if (fs.existsSync(folderPath) === false) {
        throw new Error('The provided folder path does not exist!');
    }
    const items = await fsp.readdir(folderPath, {
        withFileTypes: true,
    });
    const folders = items
        .filter((item) => item.isDirectory() === true)
        .map((folderItem) => {
        if (getFullPath === undefined) {
            return folderItem.name;
        }
        return path.join(folderPath, folderItem.name);
    });
    return folders;
}

exports.asserted = asserted;
exports.ensureJoin = ensureJoin;
exports.isFalsy = isFalsy;
exports.isNotNullish = isNotNullish;
exports.isNullish = isNullish;
exports.isString = isString;
exports.isTruthy = isTruthy;
exports.listFolders = listFolders;
exports.noop = noop;
exports.sleep = sleep;
