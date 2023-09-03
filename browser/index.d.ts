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
type Fn<T = any, U = void> = (param: T) => U;

declare const SCRIPT_NAME: string;
/** The identifier of the script to be used in logging */
declare const LOG_ID: string;
/** The initial tab URL on the script run */
declare const TAB_URL: string;

declare function alert(message?: string): void;
declare function confirm(message: string): boolean;
declare function prompt(message: string, _default?: string): string | null;

type Parent = Document | HTMLElement;
type Selectors = string[] | string;
declare function $<T = HTMLElement>(selectors: Selectors, parent?: Parent): T;
declare function $$<T extends Element = HTMLElement>(selectors: Selectors, parent?: Parent): NodeListOf<T>;

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

export { $, $$, Flag, Fn, LOG_ID, Nullable, SCRIPT_NAME, TAB_URL, alert, asserted, confirm, ensureJoin, getOptions, isFalsy, isNotNullish, isNullish, isString, isTruthy, noop, prompt, sleep };
