import { Transport, RqRequest, Responses, ResponseType } from './types';

function createRequest<TOptions>(
  transport: Transport<TOptions>,
  url: string,
  options?: TOptions,
): RqRequest {
  const getResponse = async (): Promise<Response> => {
    return transport(url, options);
  };

  return {
    response: async (): Promise<Response> => {
      return getResponse();
    },

    blob: async (): Promise<Blob> => {
      const response = await getResponse();

      return response.blob();
    },

    buffer: async (): Promise<ArrayBuffer> => {
      const response = await getResponse();

      return response.arrayBuffer();
    },

    json: async <T>(): Promise<T> => {
      const response = await getResponse();

      return response.json() as Promise<T>;
    },

    text: async (): Promise<string> => {
      const response = await getResponse();

      return response.text();
    },

    document: async (): Promise<Document> => {
      const response = await getResponse();
      const responseText = await response.text();

      const parser = new DOMParser();

      return parser.parseFromString(responseText, 'text/html');
    },

    multi: async <T>(types: ResponseType[]): Promise<Responses<T>> => {
      const response = await getResponse();
      const responses: Responses<T> = { response };

      if (types.includes('blob')) {
        responses.blob = await response.clone().blob();
      }

      if (types.includes('buffer')) {
        responses.buffer = await response.clone().arrayBuffer();
      }

      if (types.includes('json')) {
        responses.json = (await response.clone().json()) as T;
      }

      if (types.includes('text')) {
        responses.text = await response.clone().text();
      }

      if (types.includes('document')) {
        const responseText = await response.clone().text();
        const parser = new DOMParser();

        responses.document = parser.parseFromString(responseText, 'text/html');
      }

      return responses;
    },
  };
}

export { createRequest };
