declare function ensureJoin(object: string[] | string, separator?: string): string;

declare function asserted<T>(object: T | null | undefined): T;
declare function isTruthy<T>(object: T): object is NonNullable<T>;

declare function isString(object: unknown): object is string;

declare function sleep(milliSeconds: number): Promise<void>;

type Nullable<T> = T | null | undefined;

type Parent = Document | HTMLElement;
type Selectors = string[] | string;
declare function $<T = HTMLElement>(selectors: Selectors, parent?: Parent): T;
declare function $$<T extends Element = HTMLElement>(selectors: Selectors, parent?: Parent): NodeListOf<T>;

export { $, $$, Nullable, asserted, ensureJoin, isString, isTruthy, sleep };
