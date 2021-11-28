import merge from 'deepmerge';
import fs from 'fs';
import path from 'path';

const components = [];
const componentsPath = path.resolve(process.cwd(), 'webcomponents');
const files = fs.readdirSync(componentsPath);
for (const file of files) {
  const folderPath = path.resolve(componentsPath, file);
  const stats = fs.statSync(folderPath);
  stats.isDirectory() && components.push(path.resolve(folderPath, 'src', `${file}.js`));
}

import { createBasicConfig } from '@open-wc/building-rollup';

const baseConfig = createBasicConfig({
  outputDir: './dist/components',
  legacyBuild: false,
  developmentMode: process.env.ROLLUP_WATCH === 'true',
  injectServiceWorker: false,
  preserveModules: true,
});

import litcss from 'rollup-plugin-lit-css';

export default merge(baseConfig, {
  input: [...components],
  output: {
    entryFileNames: `[name].js`,
    chunkFileNames: `[name].js`,
  },
  plugins: [litcss({ uglify: true })],
});
