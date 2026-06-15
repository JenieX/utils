// https://httpbin.org/anything

export { rq } from './api/rq';
export { rx } from './api/rx';
export { createRequest as rqc } from './core/create-request';

/*
interface ResponseJSON {
  user: string,
  age: number,
}

const responses = await rq('https://example.com/').multi<ResponseJSON>(
  [
    'blob',
    'buffer',
    // 'json',
    'text',
    'document',
  ],
);

const response = responses.response!;
const blob = responses.blob!;
const buffer = responses.buffer!;
const json = responses.json!;
const text = responses.text!;
const document = responses.document!;

console.log({ response, blob, buffer, json, text, document, headers: [...response.headers] });

const jsonOnly = await rq("https://httpbin.org/anything").json<{ foo: true }>();
console.log({ jsonOnly });
 */
