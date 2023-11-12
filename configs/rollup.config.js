import css from 'rollup-plugin-native-css-modules';
import { transform } from 'lightningcss';
import terser from '@rollup/plugin-terser';
import * as fs from 'fs';
import * as path from 'path';
const pathArray = path.resolve().split(path.sep);
const packagename = pathArray.pop();
const isWebcomponent = /webcomponents/i.test(path.resolve());
const buildfolder = path.resolve('build');

import { Chalk } from 'chalk';
const chalk = new Chalk({ level: 1 });
const log = console.log;

const banner =
	`=== ${packagename} ==================================================================================`.substring(
		0,
		60
	);
log(chalk.blueBright.bold(`\n\n${banner}`));

if (isWebcomponent && fs.existsSync(buildfolder)) {
	fs.rm(buildfolder, { recursive: true, force: true }, () => { });
}

const compressStylesFunc = css => {
	/* eslint-disable no-undef */
	return transform({
		code: Buffer.from(css),
		minify: true,
		errorRecovery: true,
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
		external: ['fs', 'path', 'lightningcss'],
		plugins: [
			css({
				transform: compressStylesFunc,
			}),
			terser(),
		],
		external: [
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
			'@trvt/root',
			'wawoff2',
			'copyfiles',
		],
	},
];
