import css from 'rollup-plugin-native-css-modules';
import { transform } from 'lightningcss';

import { URL } from 'url';
const __dirname = new URL('.', import.meta.url).pathname;

export default [
	{
		input: ['index.js'],
		output: {
			format: 'esm',
			dir: 'build',
			assetFileNames: `[name]-[hash][extname].js`,
		},
		plugins: [
			css({
				transform: (css) =>
					transform({
						code: Buffer.from(css),
						minify: true,
						sourceMap: false,
					}).code.toString(),
			}),
		],
	},
];
