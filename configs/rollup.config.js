import merge from 'deepmerge';
import fs from 'fs';
import path from 'path';

import litcss from 'rollup-plugin-lit-css';
import html from '@web/rollup-plugin-html';
//import { babel } from '@rollup/plugin-babel';
//import { nodeResolve } from '@rollup/plugin-node-resolve';
import { terser } from 'rollup-plugin-terser';
//import commonjs from '@rollup/plugin-commonjs';

const components = [];
const componentsPath = path.resolve(process.cwd(), 'webcomponents');
const files = fs.readdirSync(componentsPath);

for (const file of files) {
  const folderPath = path.resolve(componentsPath, file);
  const stats = fs.statSync(folderPath);
  stats.isDirectory() && components.push(path.resolve(folderPath, 'src', `${file}.js`));
}

/* export default {
  input: [...components],
  preserveModules: false,
  output: {
    format: 'system',
    dir: './dist',
    entryFileNames: `[name].js`,
  },
  plugins: [
    //html(),
    commonjs(),
    nodeResolve({
      browser: true,
    }),
    //babel({ babelHelpers: 'bundled', exclude: 'node_modules/**' }),
    litcss({ uglify: true }),
    terser(),
    html({ input: ['./markup/index.html'], flattenOutput: true }),
  ],
};  */

import { createBasicConfig } from '@open-wc/building-rollup';

const baseConfig = createBasicConfig({
  //outputDir: './dist',
  legacyBuild: true,
  developmentMode: true,
  // developmentMode: process.env.ROLLUP_WATCH === 'true',
  injectServiceWorker: false,
  preserveModules: true,
});

//baseConfig.output[0].sourcemap = true;
//baseConfig.output[1].sourcemap = true;

export default merge(baseConfig, {
  input: [...components],
  output: [{ dir: './dist' }, { format: 'system', dir: './dist/ie11', entryFileNames: `[name].js` }],
  plugins: [
    //html(),
    html({ input: ['./markup/index.html'] }),
    litcss({ uglify: true }),
    terser(),
  ],
});
