type ListChoice = number | string;
type CheckboxValue = boolean | number | string;
interface CheckboxChoice {
    name: number | string;
    value?: CheckboxValue;
    checked?: boolean;
    disabled?: boolean | string;
}

/**
 * Shows the user a list of options to multi-select from.
 */
declare function checkbox(message: string, choices: CheckboxChoice[]): Promise<CheckboxValue[]>;

/**
 * Gets the user confirmation.
 * @param defaultAnswer Defaults to false which is no.
 */
declare function confirm(message: string, defaultAnswer?: boolean): Promise<boolean>;

/**
 * Gets the user input if provided, otherwise throws an error.
 */
declare function input(message: string): Promise<string>;

/**
 * Shows the user a list of options to select from.
 */
declare function list(message: string, choices: (ListChoice)[]): Promise<ListChoice>;

export { CheckboxChoice, checkbox, confirm, input, list };
