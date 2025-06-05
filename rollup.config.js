import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import terser from '@rollup/plugin-terser';
import typescript from '@rollup/plugin-typescript';
import { defineConfig } from 'rollup';
import clear from 'rollup-plugin-clear';

const outDir = 'dist';
const name = 'LiryKoaMiddleware';

const rollupConfig = defineConfig({
  input: 'src/index.ts',
  output: [
    // 已有的格式
    {
      dir: outDir,
      format: 'cjs',
      entryFileNames: 'index.cjs',
      sourcemap: true
    },
    {
      dir: outDir,
      format: 'es',
      entryFileNames: 'index.js',
      sourcemap: true
    },
    {
      dir: outDir,
      format: 'umd',
      name,
      entryFileNames: 'index.umd.js',
      sourcemap: true
    },

    // 新增格式
    {
      dir: outDir,
      format: 'iife',
      name,
      entryFileNames: 'index.iife.js',
      sourcemap: true
    },
    {
      dir: outDir,
      format: 'amd',
      entryFileNames: 'index.amd.js',
      sourcemap: true
    },
    {
      dir: outDir,
      format: 'system',
      entryFileNames: 'index.system.js',
      sourcemap: true
    },

    // 可选：添加压缩版本
    {
      dir: outDir,
      format: 'umd',
      name,
      entryFileNames: 'index.umd.min.js',
      plugins: [terser()],
      sourcemap: true
    },
    {
      dir: outDir,
      format: 'iife',
      name,
      entryFileNames: 'index.iife.min.js',
      plugins: [terser()],
      sourcemap: true
    }
  ],
  external: ['koa', 'dayjs'],
  plugins: [
    clear({
      targets: [outDir]
    }),
    typescript({
      tsconfig: './tsconfig.json',
      declaration: true,
      declarationDir: outDir
    }),
    commonjs(),
    // 只能在node用
    resolve({ browser: false, preferBuiltins: true }),
    terser()
  ]
});

export default rollupConfig;
