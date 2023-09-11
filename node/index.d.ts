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

interface ListFoldersOpt {
    folderPath: string;
    getFullPath?: boolean;
}
declare function listFolders({ folderPath, getFullPath }: ListFoldersOpt): Promise<string[]>;

export { Fn, Nullable, asserted, ensureJoin, isFalsy, isNotNullish, isNullish, isString, isTruthy, listFolders, noop, sleep };
