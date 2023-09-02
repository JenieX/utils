declare function ensureJoin(object: string[] | string, separator?: string): string;

declare function asserted<T>(object: T | null | undefined): T;
declare function isTruthy<T>(object: T): object is NonNullable<T>;

declare function isString(object: unknown): object is string;

declare function sleep(milliSeconds: number): Promise<void>;

type Nullable<T> = T | null | undefined;

interface ListFoldersOpt {
    folderPath: string;
    getFullPath?: boolean;
}
declare function listFolders({ folderPath, getFullPath }: ListFoldersOpt): Promise<string[]>;

export { Nullable, asserted, ensureJoin, isString, isTruthy, listFolders, sleep };
