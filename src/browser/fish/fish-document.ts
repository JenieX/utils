import fishResponse from './fish-response';
import fishXResponse from './fish-x-response';

async function fishDocument<T extends object>(
  url: string,
  options?: T,
  x?: true,
): Promise<Document> {
  const response = await (x ? fishXResponse : fishResponse)(url, options);
  const responseText = await response.text();

  const parser = new DOMParser();

  return parser.parseFromString(responseText, 'text/html');
}

export default fishDocument;
