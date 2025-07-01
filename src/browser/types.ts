interface CustomizedConsole {
  log: Console['log'],
  warn: Console['warn'],
  error: Console['error'],
  debug: Console['debug'],
}

export type { CustomizedConsole };
