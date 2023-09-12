function noop(): void {}

function toString(object: unknown): string {
  return Object.prototype.toString.call(object);
}

export { noop, toString };
