import { createRequest } from '../core/create-request';
import { fetchTransport } from '../transports/fetch-transport';
import { RqRequest } from '../core/types';

function rq(url: string, options?: RequestInit): RqRequest {
  return createRequest<RequestInit>(fetchTransport, url, options);
}

export { rq };
