import fishResponse from './fish-response';
import fishXResponse from './fish-x-response';

async function fishBlob<T extends object>(url: string, options?: T, x?: true): Promise<Blob> {
  const response = await (x ? fishXResponse : fishResponse)(url, options);

  return response.blob();
}

export default fishBlob;
