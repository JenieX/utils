import { scriptName } from './variables';

function alert(message?: string): void {
  if (message === undefined) {
    window.alert(`[ ${scriptName} ]`);

    return;
  }

  window.alert(`[ ${scriptName} ]\n\n${message}`);
}

function confirm(message: string): boolean {
  return window.confirm(`[ ${scriptName} ]\n\n${message}`);
}

function prompt(message: string, _default?: string): string | null {
  return window.prompt(`[ ${scriptName} ]\n\n${message}`, _default);
}

export { alert, confirm, prompt };
