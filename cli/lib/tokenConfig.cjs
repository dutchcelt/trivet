const cssPropertyFormat = require('./css-property-formatter.cjs');
const cssColorPatternFormat = require('./css-color-pattern-formatter.cjs');

/**
 * module.exports
 * @typedef {import('./defaults.cjs').Defaults} Defaults
 * @param {Defaults} opts - All the default values
 */
module.exports = opts => {
	const filterRegex = new RegExp(opts.exclude, 'i');
	return {
		include: opts.themePath ? [`${opts.sourcePath}/**/[!_]*.json`] : [],
		source: [`${opts.themePath || opts.sourcePath}/**/[!_]*.json`],
		format: {
			...cssPropertyFormat,
			...cssColorPatternFormat,
		},
		platforms: {
			'CSS Tokens': {
				transforms: ['name/cti/kebab'],
				transformGroup: 'css',
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
						destination: `${opts.scope}_properties.css`,
						format: 'css/property',
						options: {
							...opts,
						},
					},
					{
						destination: `${opts.scope}_color_patterns.css`,
						format: 'css/colorpattern',
						options: {
							...opts,
						},
					},
				],
			},
			'CSS Library': {
				transforms: ['name/cti/kebab'],
				transformGroup: 'css',
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
			},
		},
	};
};
