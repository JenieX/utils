import { fishXResponse } from './fish';

async function checkVPN(): Promise<void> {
  let pass: boolean;

  try {
    await fishXResponse('http://192.168.1.1/index.html', { method: 'HEAD' });
    pass = false;
  }
  catch {
    pass = true;
  }

  if (pass === false) {
    throw new Error('VPN is not enabled!');
  }
}

async function checkVPNRandomly(): Promise<void> {
  // a 1/10 chance to check.
  if (Math.floor(Math.random() * 10) === 0) {
    await checkVPN();
    console.log('%cPass check for VPN!', 'color: #04da79');
  }
}

export { checkVPN, checkVPNRandomly };
