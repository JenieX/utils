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

type Nullable<T> = T | null | undefined;
type Fn<T = void, U = any> = (param?: U) => T;
type Prettify<T> = {
    [KeyType in keyof T]: T[KeyType];
} & {};

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

export { Fn, Nullable, Prettify, asserted, isBoolean, isFalsy, isFunction, isNotNullish, isNullish, isNumber, isObject, isString, isTruthy, join, listFiles, listFolders, listFoldersSync, noop, readJSON, remove, removeFiles, sleep, toString };
