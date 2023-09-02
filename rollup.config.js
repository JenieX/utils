import typescript from '@rollup/plugin-typescript';
import dts from 'rollup-plugin-dts';

const entries = ['src/node/index.ts', 'src/browser/index.ts'];

export default [
  ...entries.map((input) => ({
    input,
    output: [
      {
        banner: '// @ts-nocheck\n',
        file: input.replace('src/', '').replace('.ts', '.mjs'),
        format: 'esm',
      },
      {
        banner: '// @ts-nocheck\n',
        file: input.replace('src/', '').replace('.ts', '.cjs'),
        format: 'cjs',
      },
    ],
    external: ['node:path', 'node:fs', 'node:fs/promises'],
    plugins: [
      typescript({
        include: ['./src/**/*.ts'],
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
