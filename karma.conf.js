/* eslint-disable import/no-extraneous-dependencies */
const { createDefaultConfig } = require('@open-wc/testing-karma');
const merge = require('deepmerge');

module.exports = config => {
	config.set(
		merge(createDefaultConfig(config), {
			files: [
				'node_modules/chai/chai.js',
				{
					pattern: config.grep ? config.grep : 'src/**/*.test.js',
					type: 'module'
				},
			],
			// you can overwrite/extend the config further
			frameworks: ['mocha','esm'],
			plugins: [
				require.resolve('@open-wc/karma-esm'),
				'karma-*',
			],
			customLaunchers: {
				ChromeHeadlessNoSandbox: {
					base: 'ChromeHeadless',
					flags: [
						'--no-sandbox',
						'--disable-setuid-sandbox',
						'--enable-experimental-web-platform-features'
					],
				},
			},
			esm: {
				 nodeResolve: false,
				importMap: 'src/importmap.json',
				compatibility: 'always',
				polyfills: {
					esModuleShims: true
				},
				http2: true,
				esm: true,
				babel: true

			},

		}),
	);
	return config;
};
