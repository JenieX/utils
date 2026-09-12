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

/**
 * Asserts that an object is neither `null` nor `undefined`.
 *
 * If the object is `null` or `undefined`, a `TypeError` is thrown.
 * Otherwise, TypeScript narrows the object to `T`.
 *
 * @template T The type of the object.
 *
 * @param object The object to validate.
 *
 * @throws {TypeError} If the object is `null` or `undefined`.
 *
 * @example
 * const object: string | undefined = Math.random() < 0.5 ? undefined : 'Hello';
 *
 * assert(object);
 *
 * // `object` is now typed as `string`.
 * console.log(object.length);
 */
declare function assert<T>(object: T | null | undefined): asserts object is T;
/**
 * Asserts that an object satisfies the given type guard.
 *
 * If the type guard returns `false`, a `TypeError` is thrown.
 * Otherwise, TypeScript narrows the object to the type accepted by
 * the type guard.
 *
 * @template T The type checked by the type guard.
 *
 * @param object The object to validate.
 * @param guard A type guard used to validate the object.
 *
 * @throws {TypeError} If the object does not satisfy the type guard.
 *
 * @example
 * const object: number | string = Math.random() < 0.5 ? 1 : 'Hello';
 *
 * assertType(object, isNumber);
 *
 * // `object` is now typed as `number`.
 * console.log(object.toFixed(2));
 *
 * @example
 * const object: unknown = 'hello';
 *
 * assertType(object, isString);
 *
 * // `object` is now typed as `string`.
 * console.log(object.toUpperCase());
 */
declare function assertType<T>(object: unknown, guard: (object: unknown) => object is T): asserts object is T;
/**
 * Asserts that an object is neither `null` nor `undefined` and returns it.
 *
 * If the object is `null` or `undefined`, a `TypeError` is thrown.
 * Otherwise, the object is returned with its type narrowed to `T`.
 *
 * @template T The type of the object.
 *
 * @param object The object to validate.
 *
 * @returns The validated object, narrowed to `T`.
 *
 * @throws {TypeError} If the object is `null` or `undefined`.
 *
 * @example
 * const object: string | undefined = Math.random() < 0.5 ? undefined : 'Hello';
 *
 * const string = asserted(object);
 *
 * // `object` is now typed as `string`.
 * console.log(string.length);
 */
declare function asserted<T>(object: T | null | undefined): T;
/**
 * Asserts that an object satisfies the given type guard and returns it
 * with the narrowed type.
 *
 * If the type guard returns `false`, a `TypeError` is thrown.
 *
 * @template T The type checked by the type guard.
 *
 * @param object The object to validate.
 * @param guard A type guard used to validate the object.
 *
 * @returns The validated object, narrowed to `T`.
 *
 * @throws {TypeError} If the object does not satisfy the type guard.
 *
 * @example
 * const object: number | string = Math.random() < 0.5 ? 1 : 'Hello';
 *
 * const number = assertedType(object, isNumber);
 *
 * // `number` is typed as `number`.
 * console.log(number.toFixed(2));
 *
 * @example
 * const object: unknown = 'hello';
 *
 * const text = assertedType(object, isString);
 *
 * // `text` is typed as `string`.
 * console.log(text.toUpperCase());
 */
declare function assertedType<T>(object: unknown, guard: (object: unknown) => object is T): T;
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

type Method$1 = 'CONNECT' | 'DELETE' | 'GET' | 'HEAD' | 'OPTIONS' | 'PATCH' | 'POST' | 'PUT' | 'TRACE';
interface FishXOptions {
    method?: Method$1;
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
/** The initial tab URL on the script run. */
declare const tabURL: string;

/**
 * Checks if the VPN is active by accessing the router address.
 * Tested on Opera browser build-in VPN only.
 */
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

interface CustomizedConsole {
    log: Console['log'];
    warn: Console['warn'];
    error: Console['error'];
    debug: Console['debug'];
}

declare function customizeConsole(debug?: boolean): CustomizedConsole;

type Method = 'CONNECT' | 'DELETE' | 'GET' | 'HEAD' | 'OPTIONS' | 'PATCH' | 'POST' | 'PUT' | 'TRACE';
interface RxOptions {
    method?: Method;
    anonymous?: boolean;
    headers?: Record<string, string>;
    body?: Blob | FormData | string;
    timeOut?: number;
    onProgress?: (response: VMScriptResponseObject<Blob>) => Promise<void> | void;
}
interface RqRequest {
    response: () => Promise<Response>;
    blob: () => Promise<Blob>;
    buffer: () => Promise<ArrayBuffer>;
    json: <T = unknown>() => Promise<T>;
    text: () => Promise<string>;
    document: () => Promise<Document>;
    multi: <T = unknown>(types: ResponseType[]) => Promise<Responses<T>>;
}
type Transport<TOptions = unknown> = (url: string, options?: TOptions) => Promise<Response>;
type ResponseType = 'blob' | 'buffer' | 'document' | 'json' | 'text';
interface Responses<T> {
    response?: Response;
    blob?: Blob;
    buffer?: ArrayBuffer;
    json?: T;
    text?: string;
    document?: Document;
}

declare function rq(url: string, options?: RequestInit): RqRequest;

declare function rx(url: string, options?: RxOptions): RqRequest;

declare function createRequest<TOptions>(transport: Transport<TOptions>, url: string, options?: TOptions): RqRequest;

export { $, $$, Flag, Fn, Nullable, Prettify, addStyle, alert, assert, assertType, asserted, assertedType, capitalize, checkVPN, checkVPNRandomly, confirm, customizeConsole, fish, fishResponse, fishX, fishXResponse, getOptions, getSearchParam, imageLoad, isBoolean, isFalsy, isFunction, isNotNullish, isNullish, isNumber, isObject, isString, isTruthy, join, noop, padZeros, pageLoad, prompt, remove, removeSearchParams, rq, createRequest as rqc, rx, saveFile, scriptName, setSearchParam, sleep, tabURL, toString };
