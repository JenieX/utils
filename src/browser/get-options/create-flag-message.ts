import { Flag } from './types';

function createFlagMessage(flag: Flag): string {
  const { message: messageHeader, values, type } = flag;
  let message = messageHeader;

  if (values !== undefined) {
    message += `\n\n${values.join(' | ')}`;
  }

  if (type === 'number' && flag.range !== undefined) {
    message += '\n';

    const [min, max] = flag.range;

    if (min !== undefined) {
      message += `\nMinimum: ${min}`;
    }

    if (max !== undefined) {
      message += `\nMaximum: ${max}`;
    }
  }

  return message;
}

export default createFlagMessage;
