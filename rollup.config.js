import typescript from '@rollup/plugin-typescript';
import dts from 'rollup-plugin-dts';

/** @typedef {{input:string, formats:['esm', 'cjs']|['esm']}} Entry */

/** @type {Entry[]} */
const entries = [
  { input: 'src/node/index.ts', formats: ['esm', 'cjs'] },
  { input: 'src/browser/index.ts', formats: ['esm', 'cjs'] },
  // { input: 'src/browser/index.ts' },
];

export default [
  ...entries.map(({ input, formats }) => ({
    input,
    output: formats.map((format) => {
      const extension = format === 'esm' ? '.js' : '.cjs';

      return {
        file: input.replace('src/', '').replace('.ts', extension),
        format,
      };
    }),
    external: ['node:path', 'node:fs', 'node:fs/promises'],
    plugins: [
      typescript({
        include: ['./src/**/*.ts', './node_modules/@violentmonkey/types/index.d.ts'],
      }),
    ],
  })),
  ...entries.map(({ input }) => ({
    input,
    output: {
      file: input.replace('src/', '').replace('.ts', '.d.ts'),
      format: 'esm',
    },
    external: [],
    plugins: [dts({ respectExternal: true })],
  })),
];
