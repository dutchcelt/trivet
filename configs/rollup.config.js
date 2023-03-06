import css from 'rollup-plugin-native-css-modules';
import { transform } from 'lightningcss';
import terser from '@rollup/plugin-terser';

import { URL } from 'url';
const __dirname = new URL('.', import.meta.url).pathname;

export default [
	{
		input: ['index.js'],
		output: {
			format: 'esm',
			dir: 'build',
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
			terser(),
		],
	},
];
