type Nullable<T> = T | null | undefined;

type Fn<T = void, U = any> = (param?: U) => T;

export type { Nullable, Fn };
