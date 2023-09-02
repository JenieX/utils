function isString(object: unknown): object is string {
  return typeof object === 'string';
}

export { isString };
