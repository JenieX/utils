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

export interface FishXOptions {
  method?: Method,
  anonymous?: boolean,
  headers?: Record<string, string>,
  body?: Blob | FormData | string,
  timeOut?: number,
  onProgress?: (response: VMScriptResponseObject<Blob>) => Promise<void> | void,
}

export interface Fish<T> {
  blob: (url: string, options?: T) => Promise<Blob>,
  buffer: (url: string, options?: T) => Promise<ArrayBuffer>,
  document: (url: string, options?: T) => Promise<Document>,
  JSON: (url: string, options?: T) => Promise<object>,
  text: (url: string, options?: T) => Promise<string>,
}
