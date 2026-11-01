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

declare function exists(path: string): Promise<boolean>;

declare function existsFile(path: string): Promise<boolean>;

declare function existsFileSync(path: string): boolean;

declare function existsFolder(path: string): Promise<boolean>;

declare function existsFolderSync(path: string): boolean;

declare function existsSync(path: string): boolean;

interface ListBaseOpt {
    /** The absolute path of the target folder. */
    folderPath: string;
    getFullPath?: boolean;
}
interface ListFoldersOpt extends ListBaseOpt {
}
interface ListFilesOpt extends ListBaseOpt {
    /**
     * If provided, only files with these extensions will be processed.
     *
     * @example
     * ['.css', '.html'];
     */
    filter?: string[];
}
interface RemoveFilesOpt extends Omit<ListFilesOpt, 'getFullPath'> {
}

/**
 * Lists the files that are present in the provided folder path.
 * @throws an error if the provided folder path does not exist.
 *
 * @category File-System
 */
declare function listFiles({ folderPath, getFullPath, filter }: ListFilesOpt): Promise<string[]>;

/**
 * Lists the folders that are present in the provided folder path.
 * @throws an error if the provided folder path does not exist.
 *
 * @category File-System
 */
declare function listFolders({ folderPath, getFullPath }: ListFoldersOpt): Promise<string[]>;

/**
 * Lists the folders that are present in the provided folder path.
 * @throws an error if the provided folder path does not exist.
 *
 * @category File-System
 */
declare function listFoldersSync({ folderPath, getFullPath }: ListFoldersOpt): string[];

/**
 * Removes the files that are present in the provided folder path.
 * @throws an error if the provided folder path does not exist.
 * @throws an error if the files are outside or at the root of the project folder.
 *
 * @category File-System
 */
declare function removeFiles({ folderPath, filter }: RemoveFilesOpt): Promise<void>;

declare function readJSON<T = object>(filePath: string, withComments?: boolean): Promise<T>;

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

declare function createRequest<TOptions>(transport: Transport<TOptions>, url: string, options?: TOptions): RqRequest;

export { Fn, Nullable, Prettify, assert, assertType, asserted, assertedType, capitalize, exists, existsFile, existsFileSync, existsFolder, existsFolderSync, existsSync, isBoolean, isFalsy, isFunction, isNotNullish, isNullish, isNumber, isObject, isString, isTruthy, join, listFiles, listFolders, listFoldersSync, noop, padZeros, readJSON, remove, removeFiles, rq, createRequest as rqc, sleep, toString };
