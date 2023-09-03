import typescript from '@rollup/plugin-typescript';
import dts from 'rollup-plugin-dts';

const entries = ['src/node/index.ts', 'src/browser/index.ts'];

export default [
  ...entries.map((input) => ({
    input,
    output: [
      {
        file: input.replace('src/', '').replace('.ts', '.mjs'),
        format: 'esm',
      },
      {
        file: input.replace('src/', '').replace('.ts', '.cjs'),
        format: 'cjs',
      },
    ],
    external: ['node:path', 'node:fs', 'node:fs/promises'],
    plugins: [
      typescript({
        include: ['./src/**/*.ts', './node_modules/@violentmonkey/types/index.d.ts'],
      }),
    ],
  })),
  ...entries.map((input) => ({
    input,
    output: {
      file: input.replace('src/', '').replace('.ts', '.d.ts'),
      format: 'esm',
    },
    external: [],
    plugins: [dts({ respectExternal: true })],
  })),
];
