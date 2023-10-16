import { fishXResponse } from './fish';

/**
 * Checks if the VPN is active by accessing the router address.
 * Tested on Opera browser build-in VPN only.
 */
async function checkVPN(): Promise<void> {
  let pass = false;

  try {
    await fishXResponse('http://192.168.1.1/index.html', { method: 'HEAD' });
  }
  catch (exception) {
    if ((exception as Error).message.includes('ended with 0 status')) {
      pass = true;
    }
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
