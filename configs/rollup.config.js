import css from 'rollup-plugin-native-css-modules';
import { transform } from 'lightningcss';
import terser from '@rollup/plugin-terser';
import fs from 'fs';
import path from 'path';
const pathArray = path.resolve().split(path.sep);
const packagename = pathArray.pop();
const isWebcomponent = /webcomponents/i.test(path.resolve());
const buildfolder = path.resolve('build');

console.info(
	`\n\n=== ${packagename} =========================================`
);

if (isWebcomponent && fs.existsSync(buildfolder)) {
	fs.rm(buildfolder, { recursive: true, force: true }, (err) => {
		//console.error(err);
	});
}

const compressStylesFunc = (css) => {
	return transform({
		code: Buffer.from(css),
		minify: true,
		sourceMap: false,
	}).code.toString();
};

export default [
	{
		input: ['index.js'],
		output: {
			format: 'esm',
			dir: 'build',
		},
		plugins: [
			css({
				transform: compressStylesFunc,
			}),
			terser(),
		],
	},
];
