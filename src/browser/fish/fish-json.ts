import fishResponse from './fish-response';
import fishXResponse from './fish-x-response';

async function fishJson<T extends object>(url: string, options?: T, x?: true): Promise<object> {
  const response = await (x ? fishXResponse : fishResponse)(url, options);

  return response.json() as object;
}

export default fishJson;
