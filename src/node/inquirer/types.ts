export type ListChoice = number | string;

export type CheckboxValue = boolean | number | string;

export interface CheckboxChoice {
  name: number | string,
  value?: CheckboxValue,
  checked?: boolean,
  disabled?: boolean | string,
}
