import { isFileURL } from '../core/is-file-url';

async function fetchTransport(url: string, options?: RequestInit): Promise<Response> {
  const response = await fetch(url, options);

  if (!response.ok && !isFileURL(response.url)) {
    throw new Error(`Request to ${response.url} ended with ${response.status} status.`);
  }

  return response;
}

export { fetchTransport };
