const cssPropertyFormat = require('./css-property-formatter.cjs');
const cssColorPatternFormat = require('./css-color-pattern-formatter.cjs');
const StyleDictionary = require('style-dictionary-utils');
require('./css-system-color-transformer.cjs');
require('./css-fluid-transformer.cjs');

StyleDictionary.registerTransformGroup({
	name: 'trvt/css',
	transforms: [
		'system/colors',
		'trvt/css/fluid',
		...StyleDictionary.transformGroup['css/extended'],
	]
});

/**
 * module.exports
 * @typedef {import('./defaults.cjs').Defaults} Defaults
 * @param {Defaults} opts - All the default values
 */
module.exports = opts => {
	const filterRegex = new RegExp(opts.exclude, 'i');

	const themeTokensGlobArray = opts.themePath
		? [`${opts.themePath}/**/[!_]*.json`]
		: [];
	const sourceTokensGlobArray = opts.sourcePath
		? [`${opts.sourcePath}/**/[!_]*.json`]
		: [];
	return {
		include: sourceTokensGlobArray,
		source: themeTokensGlobArray,
		format: {
			...cssPropertyFormat,
			...cssColorPatternFormat,
		},
		platforms: {
			'CSS Tokens': {
				transformGroup: 'trvt/css',
				transforms: ['system/colors','trvt/css/fluid','shadow/css','border/css','font/css','attribute/cti', 'name/cti/kebab'],
				buildPath: `${opts.buildPath}/`,
				prefix: opts.scope,
				files: [
					{
						destination: `${opts.scope}_tokens.css`,
						format: 'css/variables',
						filter: (/** @type {Object} */ token) =>
							!filterRegex.test(token.name),
						options: {
							showFileHeader: false,
							...opts,
						},
					},
					{
						destination: `${opts.scope}_color_patterns.css`,
						format: 'css/colorpattern',
						filter: (/** @type {Object} */ token) =>
							!filterRegex.test(token.name),
						options: {
							...opts,
						},
					},
				],
				actions: ['trivet'],
			},
			'CSS Properties': {
				 transformGroup: 'trvt/css',
				transforms: ['system/colors','attribute/cti', 'name/cti/kebab'],
				//transformGroup: 'css',
				buildPath: `${opts.buildPath}/`,
				prefix: opts.scope,
				files: [
					{
						destination: `${opts.scope}_properties.css`,
						format: 'css/property',
						filter: (/** @type {Object} */ token) =>
							!filterRegex.test(token.name),
						options: {
							...opts,
						},
					},
				],
				actions: ['trivet'],
			},
			'CSS Library': {
				transformGroup: 'trvt/css',
				transforms: ['system/colors','attribute/cti', 'name/cti/kebab'],
				//transformGroup: 'css',
				buildPath: `${opts.buildPath}/`,
				prefix: opts.scope,
				files: [
					{
						destination: `${opts.scope}_${opts.exclude}.css`,
						format: 'css/variables',
						filter: (/** @type {Object} */ token) =>
							filterRegex.test(token.name),
						options: {
							showFileHeader: false,
							...opts,
						},
					},
				],
				actions: ['trivet'],
			},
		},
	};
};
