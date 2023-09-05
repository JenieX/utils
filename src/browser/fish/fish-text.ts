import fishResponse from './fish-response';
import fishXResponse from './fish-x-response';

async function fishText<T extends object>(url: string, options?: T, x?: true): Promise<string> {
  const response = await (x ? fishXResponse : fishResponse)(url, options);

  return response.text();
}

export default fishText;
