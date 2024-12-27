// @ts-nocheck
import defaults from './defaults.js';

/**
 * @param {import('./defaults.js').Defaults} settings - All the default values
 */
export default settings => {
	const opts = Object.assign({}, defaults, settings);
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
		platforms: {
			'CSS Tokens': {
				transformGroup: 'trvt/css',
				transforms: [
					'system/colors',
					'trvt/css/fluid',
					'shadow/css/shorthand',
					'border/css/shorthand',
					'fontFamily/css',
					'attribute/cti',
					'name/kebab',
				],
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
				transforms: ['system/colors', 'attribute/cti', 'name/kebab'],
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
				transforms: ['system/colors', 'attribute/cti', 'name/kebab'],
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
