import { RxOptions } from '../core/types';
import { isFileURL } from '../core/is-file-url';

async function gmTransport(url: string, options?: RxOptions): Promise<Response> {
  const { method, anonymous, headers, body, timeOut, onProgress } = options ?? {};

  return new Promise((resolve, reject) => {
    GM.xmlHttpRequest<Blob>({
      url,
      method: method ?? 'GET',
      headers,
      /** Note: To manually set the 'cookie' header, you have to set 'anonymous' to true. */
      anonymous,
      data: body,
      responseType: 'blob',
      timeout: timeOut,
      onprogress: onProgress,
      onload({ response, statusText, status, finalUrl }) {
        const ok = status >= 200 && status < 300;

        if (!ok && !isFileURL(finalUrl)) {
          reject(new Error(`Request to ${url} ended with ${status} status.`));

          return;
        }

        const properResponse = new Response(response, {
          statusText,
          status: isFileURL(finalUrl) ? 200 : status,
        });

        Object.defineProperty(properResponse, 'url', { value: finalUrl });

        resolve(properResponse);
      },
      onerror({ status }) {
        reject(new Error(`Request to ${url} ended with ${status} status.`));
      },
    });
  });
}

export { gmTransport };
