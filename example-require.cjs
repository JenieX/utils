/* eslint-disable @typescript-eslint/no-unused-vars, import/extensions */

// const { $ } = require('@jeniex/utils/browser');
// const { listFolders } = require('@jeniex/utils/node');

const { $ } = require('./browser');
const { asserted } = require('./node');

/** @type {null|undefined|'Hello'|'Yes'} */
let item;

const assertedItem = asserted(item);
