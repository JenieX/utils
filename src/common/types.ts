type Nullable<T> = T | null | undefined;

type Fn<T = void, U = any> = (param?: U) => T;

// eslint-disable-next-line @typescript-eslint/ban-types
type Prettify<T> = { [KeyType in keyof T]: T[KeyType] } & {};

export type { Nullable, Fn, Prettify };
