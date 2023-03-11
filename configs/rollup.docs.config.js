import { rollupPluginHTML as html } from '@web/rollup-plugin-html';

export default {
	input: './docs/index.html',
	output: { dir: './dist' },
	plugins: [
		html({
			extractAssets: true,
			flattenOutput: true,
		}),
	],
};
