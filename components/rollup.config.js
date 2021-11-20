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
  stats.isDirectory() && components.push(folderPath + `/${file}.js`);
}

// use createSpaConfig for bundling a Single Page App
// import { createSpaConfig } from '@open-wc/building-rollup';

// use createBasicConfig to do regular JS to JS bundling
import { createBasicConfig } from '@open-wc/building-rollup';

const baseConfig = createBasicConfig({
  // use the outputdir option to modify where files are output
  outputDir: '../build',

  // if you need to support older browsers, such as IE11, set the legacyBuild
  // option to generate an additional build just for this browser
  legacyBuild: false,

  // development mode creates a non-minified build for debugging or development
  developmentMode: process.env.ROLLUP_WATCH === 'true',

  // set to true to inject the service worker registration into your index.html
  injectServiceWorker: false,
});

export default merge(baseConfig, {
  // if you use createSpaConfig, you can use your index.html as entrypoint,
  // any <script type="module"> inside will be bundled by rollup
  //input: './src/index.html',

  // alternatively, you can use your JS as entrypoint for rollup and
  // optionally set a HTML template manually
  input: ['./src/index.js', './src/init.js', ...components],
  output: {
    entryFileNames: `[name].js`,
    chunkFileNames: `[name].js`,
  },

  plugins: [litcss({ specifier: 'lit-element', uglify: true })],
});
