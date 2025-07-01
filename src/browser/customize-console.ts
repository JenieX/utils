import { noop } from '../common';
import { logId } from './variables';
import { CustomizedConsole } from './types';

function customizeConsole(debug = false): CustomizedConsole {
  const base = window.console;

  return {
    log: base.log.bind(base, logId),
    warn: base.warn.bind(base, logId),
    error: base.error.bind(base, logId),
    debug: debug ? base.log.bind(base, logId) : noop,
  };
}

export { customizeConsole };
