import merge from 'deepmerge';
import fs from 'fs';
import path from 'path';

import litcss from 'rollup-plugin-lit-css';

const components = [];
const componentsPath = path.resolve('src', 'components');
const dir = './src/components';
const files = fs.readdirSync(componentsPath);
for (const file of files) {
  const folderPath = path.resolve(componentsPath, file);
  const relativePath = './' + path.relative(process.cwd(), folderPath);
  const stats = fs.statSync(folderPath);
  stats.isDirectory() && components.push(relativePath + `/${file}.js`);
}

import { createBasicConfig } from '@open-wc/building-rollup';

const baseConfig = createBasicConfig({
  outputDir: './dist/components',
  legacyBuild: false,
  developmentMode: true,
  //developmentMode: process.env.ROLLUP_WATCH === 'true',
  injectServiceWorker: false,
  preserveModules: true,
});

export default merge(baseConfig, {
  input: ['./src/init.js', ...components],
  output: {
    entryFileNames: `[name].js`,
    chunkFileNames: `[name].js`,
  },
  plugins: [litcss({ uglify: true })],
});
