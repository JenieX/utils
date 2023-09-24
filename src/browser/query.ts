import { join } from '../common';

type Parent = Document | HTMLElement;
type Selectors = string[] | string;

function $<T = HTMLElement>(selectors: Selectors, parent?: Parent): T {
  const element = (parent ?? document).querySelector(join(selectors));
  if (element === null) {
    throw new Error(`Could not find the element with the selector ${selectors}`);
  }

  return element as T;
}

function $$<T extends Element = HTMLElement>(selectors: Selectors, parent?: Parent): NodeListOf<T> {
  const elements = (parent ?? document).querySelectorAll(join(selectors));
  if (elements.length === 0) {
    throw new Error(`Could not find any element with the selector ${selectors}`);
  }

  return elements as NodeListOf<T>;
}

export { $, $$ };
