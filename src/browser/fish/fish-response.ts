async function fishResponse(url: string, options?: RequestInit): Promise<Response> {
  const response = await fetch(url, options);

  if (!response.ok && !response.url.startsWith('file:///')) {
    throw new Error(`Request to ${response.url} ended with ${response.status} status.`);
  }

  return response;
}

export default fishResponse;
