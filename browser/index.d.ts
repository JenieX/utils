/**
 * Joins an array's items or do nothing if it is joined already.
 *
 * @category Array
 */
declare function join(object: string[] | string, separator?: string): string;

/**
 * Removes an item from an array by mutating it.
 * @throws an error if the object to be removed does not exist inside the array.
 *
 * @category Array
 */
declare function remove<T>(array: T[], object: T): void;

declare function noop(): void;
declare function toString(object: unknown): string;

declare function asserted<T>(object: T | null | undefined): T;
declare function isTruthy<T>(object: T): object is Exclude<T, '' | 0 | false | null | undefined>;
declare function isFalsy(object: unknown): object is '' | 0 | false | null | undefined;
declare function isNullish(object: unknown): object is null | undefined;
declare function isNotNullish<T>(object: T): object is Exclude<T, null | undefined>;

declare function isString(object: unknown): object is string;
declare function isNumber(object: unknown): object is number;
declare function isBoolean(object: unknown): object is boolean;
declare function isObject(object: unknown): object is object;
declare function isFunction<T extends Function>(object: unknown): object is T;

/**
 * A wrapper around `setTimeout`.
 *
 * @category Promise
 */
declare function sleep(milliSeconds: number): Promise<void>;

/**
 * Adds leading zeros to a number.
 *
 * @category String
 */
declare function padZeros(number: number, length: number): string;

/**
 * capitalizes a word or a sentence.
 *
 * @category String
 */
declare function capitalize(sentence: string): string;

type Nullable<T> = T | null | undefined;
type Fn<T = void, U = any> = (param?: U) => T;
type Prettify<T> = {
    [KeyType in keyof T]: T[KeyType];
} & {};

declare function alert(message?: string): void;
declare function confirm(message: string): boolean;
declare function prompt(message: string, _default?: string): string | null;

type Method = 'CONNECT' | 'DELETE' | 'GET' | 'HEAD' | 'OPTIONS' | 'PATCH' | 'POST' | 'PUT' | 'TRACE';
interface FishXOptions {
    method?: Method;
    anonymous?: boolean;
    headers?: Record<string, string>;
    body?: Blob | FormData | string;
    timeOut?: number;
    onProgress?: (response: VMScriptResponseObject<Blob>) => Promise<void> | void;
}
interface Fish<T> {
    blob: (url: string, options?: T) => Promise<Blob>;
    buffer: (url: string, options?: T) => Promise<ArrayBuffer>;
    document: (url: string, options?: T) => Promise<Document>;
    JSON: (url: string, options?: T) => Promise<object>;
    text: (url: string, options?: T) => Promise<string>;
}

declare function fishResponse(url: string, options?: RequestInit): Promise<Response>;

declare function fishXResponse(url: string, fishOptions?: FishXOptions): Promise<Response>;

declare const fish: Fish<RequestInit>;
declare const fishX: Fish<FishXOptions>;

type Parent = Document | HTMLElement;
type Selectors = string[] | string;
declare function $<T = HTMLElement>(selectors: Selectors, parent?: Parent): T;
declare function $$<T extends Element = HTMLElement>(selectors: Selectors, parent?: Parent): NodeListOf<T>;

/**
 * @param key The name of the param in the search query.
 * @param fullURL If provided, it will be our target, otherwise it is the current location.
 */
declare function getSearchParam(key: string, fullURL?: string): string | undefined;
/**
 *
 * @param key The name of the param that is to be in the search query.
 * @param value Its value.
 * @param fullURL If provided, it will be our target, otherwise it is the current location.
 */
declare function setSearchParam(key: string, value: string, fullURL?: string): string;
/**
 * @param keys The names of the param in the search query.
 * @param fullURL If provided, it will be our target, otherwise it is the current location.
 */
declare function removeSearchParams(keys: string[], fullURL?: string): string;

declare const scriptName: string;
/** The identifier of the script to be used in logging. */
declare const logId: string;
/** The initial tab URL on the script run. */
declare const tabURL: string;

declare function checkVPN(): Promise<void>;
declare function checkVPNRandomly(): Promise<void>;

declare function addStyle(css: string, parent?: HTMLElement): HTMLStyleElement;

/**
 * Waits for image to fully load or throws an error if it fails.
 */
declare function imageLoad(img: HTMLImageElement): Promise<void>;

/**
 * Waits for the page to load.
 * @param completely Whether or not to wait for resources to load as well.
 */
declare function pageLoad(completely?: boolean): Promise<void>;

declare function saveFile(blob: Blob, fileName: string): void;

interface FlagBase {
    name: string;
    message: string;
}
interface FlagBoolean extends FlagBase {
    type: 'boolean';
    values?: ['no', 'yes'] | ['yes', 'no'];
    default: 'no' | 'yes';
}
interface FlagString extends FlagBase {
    type: 'string';
    values?: string[];
    default: string;
}
interface FlagNumber extends FlagBase {
    type: 'number';
    values?: number[];
    range?: [number, number] | [number, undefined] | [undefined, number];
    default: number;
}
type Flag = FlagBoolean | FlagNumber | FlagString;
type FlagValue = boolean | number | string;
type Options = Record<string, FlagValue>;

declare function getOptions(flags: Flag[]): Promise<Options>;

export { $, $$, Flag, Fn, Nullable, Prettify, addStyle, alert, asserted, capitalize, checkVPN, checkVPNRandomly, confirm, fish, fishResponse, fishX, fishXResponse, getOptions, getSearchParam, imageLoad, isBoolean, isFalsy, isFunction, isNotNullish, isNullish, isNumber, isObject, isString, isTruthy, join, logId, noop, padZeros, pageLoad, prompt, remove, removeSearchParams, saveFile, scriptName, setSearchParam, sleep, tabURL, toString };
