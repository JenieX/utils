function isFileURL(url: string): boolean {
  return url.startsWith('file:///');
}

export { isFileURL };
