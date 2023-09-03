type Nullable<T> = T | null | undefined;

type Fn<T = any, U = void> = (param: T) => U;

export type { Nullable, Fn };
