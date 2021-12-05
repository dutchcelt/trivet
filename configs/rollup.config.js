//import merge from 'deepmerge';
import fs from 'fs';
import path from 'path';
//import regeneratorRuntime from "regenerator-runtime";


import litcss from 'rollup-plugin-lit-css';
import html from '@web/rollup-plugin-html';
import { babel } from '@rollup/plugin-babel';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import { terser } from 'rollup-plugin-terser';
import commonjs from '@rollup/plugin-commonjs';
import polyfillsLoader from '@web/rollup-plugin-polyfills-loader';

const components = [];
const componentsPath = path.resolve(process.cwd(), 'webcomponents');
const files = fs.readdirSync(componentsPath);

for (const file of files) {
  const folderPath = path.resolve(componentsPath, file);
  const stats = fs.statSync(folderPath);
  stats.isDirectory() && components.push(path.resolve(folderPath, 'src', `${file}.js`));
}

export default {
  input: [...components],
  preserveModules: false,
output:
  {
    format: 'system',
    chunkFileNames: '[name].js',
    entryFileNames: '[name].js',
    dir: './dist',
  },

  plugins: [
    commonjs(),
    nodeResolve(),
   //babel(),

    // polyfillsLoader({
    //    polyfills: {
    //      regeneratorRuntime:true,
    //      esModuleShims:true,
    //      coreJs: true,
    //      systemjs: true,
    //      fetch: true,
    //      abortController: true,
    //      webcomponents: true,
    //      shadyCssCustomStyle:true
    //    },
    //  }),
    babel({babelHelpers: 'runtime'}),
    litcss({ uglify: false }),

// terser()
  ],
};
/*
import { createBasicConfig } from '@open-wc/building-rollup';

const baseConfig = createBasicConfig({
  //outputDir: './dist',
  legacyBuild: true,
  developmentMode: true,
  // developmentMode: process.env.ROLLUP_WATCH === 'true',
  injectServiceWorker: false,
  preserveModules: true,
});

baseConfig.output[0].sourcemap = true;
baseConfig.output[1].sourcemap = true;

export default merge(baseConfig, {
  input: [...components],
  plugins: [
    //html(),
    html({ input: ['./markup/index.html'] }),
    polyfillsLoader({
      polyfills: {
        coreJs: true,
        promise: true,
        systemjs:true,
        fetch: true,
        webcomponents: true,
      },
    }),

    litcss({ uglify: true }),
    terser(),
  ],
}); */
