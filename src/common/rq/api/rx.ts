import { createRequest } from '../core/create-request';
import { gmTransport } from '../transports/gm-transport';
import { RxOptions, RqRequest } from '../core/types';

function rx(url: string, options?: RxOptions): RqRequest {
  return createRequest<RxOptions>(gmTransport, url, options);
}

export { rx };
