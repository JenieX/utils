import fishBlob from './fish-blob';
import fishBuffer from './fish-buffer';
import fishDocument from './fish-document';
import fishJSON from './fish-json';
import fishText from './fish-text';
import { Fish, FishXOptions } from './types';

// https://httpbin.org/anything

const fish: Fish<RequestInit> = {
  blob: async (url: string, options?: RequestInit) => fishBlob(url, options),
  buffer: async (url: string, options?: RequestInit) => fishBuffer(url, options),
  document: async (url: string, options?: RequestInit) => fishDocument(url, options),
  JSON: async (url: string, options?: RequestInit) => fishJSON(url, options),
  text: async (url: string, options?: RequestInit) => fishText(url, options),
};

const fishX: Fish<FishXOptions> = {
  blob: async (url: string, options?: FishXOptions) => fishBlob(url, options, true),
  buffer: async (url: string, options?: FishXOptions) => fishBuffer(url, options, true),
  document: async (url: string, options?: FishXOptions) => fishDocument(url, options, true),
  JSON: async (url: string, options?: FishXOptions) => fishJSON(url, options, true),
  text: async (url: string, options?: FishXOptions) => fishText(url, options, true),
};

export { default as fishResponse } from './fish-response';
export { default as fishXResponse } from './fish-x-response';
export { fish, fishX };
