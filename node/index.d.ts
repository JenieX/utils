declare function ensureJoin(object: string[] | string, separator?: string): string;

declare function noop(): void;

declare function asserted<T>(object: T | null | undefined): T;
declare function isTruthy<T>(object: T): object is Exclude<T, '' | 0 | false | null | undefined>;
declare function isFalsy(object: unknown): object is '' | 0 | false | null | undefined;
declare function isNullish(object: unknown): object is null | undefined;
declare function isNotNullish<T>(object: T): object is Exclude<T, null | undefined>;

declare function isString(object: unknown): object is string;

declare function sleep(milliSeconds: number): Promise<void>;

type Nullable<T> = T | null | undefined;
type Fn<T = void, U = any> = (param?: U) => T;

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
 * Get a list of files that are present in the provided folder path.
 * If the provided folder path does not exists, it will return an empty array.
 */
declare function listFiles({ folderPath, getFullPath, filter }: ListFilesOpt): Promise<string[]>;

/**
 * Get a list of folders that are present in the provided folder path.
 * If the provided folder path does not exists, an error will be thrown.
 */
declare function listFolders({ folderPath, getFullPath }: ListFoldersOpt): Promise<string[]>;

/**
 * Get a list of folders that are present in the provided folder path.
 * If the provided folder path does not exists, an error will be thrown.
 */
declare function listFoldersSync({ folderPath, getFullPath }: ListFoldersOpt): string[];

declare function removeFiles({ folderPath, filter }: RemoveFilesOpt): Promise<void>;

export { Fn, Nullable, asserted, ensureJoin, isFalsy, isNotNullish, isNullish, isString, isTruthy, listFiles, listFolders, listFoldersSync, noop, removeFiles, sleep };
