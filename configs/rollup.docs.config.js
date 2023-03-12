import { rollupPluginHTML as html } from '@web/rollup-plugin-html';
console.info(`\n\n=== Docs =========================================`);
export default {
	input: 'index.html',
	output: { dir: 'dist' },
	plugins: [
		html({
			extractAssets: false,
			flattenOutput: false,
		}),
	],
};
