type Method =
  | 'CONNECT'
  | 'DELETE'
  | 'GET'
  | 'HEAD'
  | 'OPTIONS'
  | 'PATCH'
  | 'POST'
  | 'PUT'
  | 'TRACE';

interface RxOptions {
  method?: Method,
  anonymous?: boolean,
  headers?: Record<string, string>,
  body?: Blob | FormData | string,
  timeOut?: number,
  onProgress?: (response: VMScriptResponseObject<Blob>) => Promise<void> | void,
}

interface RqRequest {
  response: () => Promise<Response>,
  blob: () => Promise<Blob>,
  buffer: () => Promise<ArrayBuffer>,
  json: <T = unknown>() => Promise<T>,
  text: () => Promise<string>,
  document: () => Promise<Document>,
  multi: <T = unknown>(types: ResponseType[]) => Promise<Responses<T>>,
}

type Transport<TOptions = unknown> = (
  url: string,
  options?: TOptions
) => Promise<Response>;

type ResponseType = 'blob' | 'buffer' | 'document' | 'json' | 'text';

interface Responses<T> {
  response?: Response,
  blob?: Blob,
  buffer?: ArrayBuffer,
  json?: T,
  text?: string,
  document?: Document,
}

export type { RqRequest, RxOptions, Transport, ResponseType, Responses };
