// @ts-ignore
import { cssModules } from 'rollup-plugin-css-modules';
// @ts-ignore
import css from '../packages/utils/plugins/rollup-preserve-css-modules/index.js';
import { transform } from 'lightningcss';
import * as fs from 'fs';
import * as path from 'path';
const pathArray = path.resolve().split(path.sep);
const packagename = pathArray.pop();
const isWebcomponent = /packages\/custom-elements/i.test(path.resolve());
const buildfolder = path.resolve('dist');

import { Chalk } from 'chalk';
const chalk = new Chalk({ level: 1 });
const log = console.log;

const banner =
	`=== ${packagename} ==================================================================================`.substring(
		0,
		60,
	);
log(chalk.blueBright.bold(`\n\n${banner}`));

if (isWebcomponent && fs.existsSync(buildfolder)) {
	// @ts-ignore
	fs.rm(buildfolder, { recursive: true, force: true }, () => {});
}

const compressStylesFunc = (
	/** @type {ArrayBuffer | SharedArrayBuffer} */ css,
) => {
	/* eslint-disable no-undef */
	return transform({
		code: Buffer.from(css),
		minify: true,
		errorRecovery: true,
		sourceMap: false,
		filename: '',
	}).code.toString();
};

export default [
	{
		input: ['index.js'],
		output: {
			format: 'esm',
			dir: 'dist',
			importAttributesKey: 'with',
		},

		plugins: [
			// @ts-ignore
			cssModules(),

			css({
				// @ts-expect-error
				transform: compressStylesFunc,
			}),
		],
		external: [
			'fs',
			'path',
			'lightningcss',
			'@trvt/layout',
			'@trvt/button',
			'@trvt/cli',
			'@trvt/card',
			'@trvt/article',
			'@trvt/header',
			'@trvt/contenttoggle',
			'@trvt/datatable',
			'@trvt/dragscroller',
			'@trvt/lists',
			'@trvt/core',
			'@trvt/assets',
			'@trvt/designtokens',
			'@trvt/docs',
			'@trvt/site',
			'@trvt/utils',
			'@trvt/root',
			'@trvt/styles',
			'@trvt/container',
			'wawoff2',
			'copyfiles',
		],
	},
];
