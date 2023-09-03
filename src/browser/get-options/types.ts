interface FlagBase {
  name: string,
  message: string,
}

interface FlagBoolean extends FlagBase {
  type: 'boolean',
  values?: ['no', 'yes'] | ['yes', 'no'],
  default: 'no' | 'yes',
}

interface FlagString extends FlagBase {
  type: 'string',
  values?: string[],
  default: string,
}

interface FlagNumber extends FlagBase {
  type: 'number',
  values?: number[],
  range?: [number, number] | [number, undefined] | [undefined, number],
  default: number,
}

export type Flag = FlagBoolean | FlagNumber | FlagString;

export type FlagValue = boolean | number | string;

export type Options = Record<string, FlagValue>;
