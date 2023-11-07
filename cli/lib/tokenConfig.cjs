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
			css: {
				transforms: ['name/cti/kebab'],
				transformGroup: 'css',
				buildPath: `${opts.buildPath}/`,
				prefix: opts.scope,
				opts,
				files: [
					{
						destination: `${opts.scope}_${opts.filename}`,
						format: 'css/variables',
						filter: (/** @type {Object} */ token) =>
							!filterRegex.test(token.name),
						options: {
							showFileHeader: false,
						},
					},
					{
						destination: `${opts.scope}_properties.css`,
						format: 'css/property',
						options: {},
					},
					{
						destination: `${opts.scope}_color_patterns.css`,
						format: 'css/colorpattern',
					},
				],
			},
			library: {
				transforms: ['name/cti/kebab'],
				transformGroup: 'css',
				buildPath: `${opts.buildPath}/`,
				prefix: opts.scope,
				opts,
				files: [
					{
						destination: `${opts.scope}_${opts.exclude}.css`,
						format: 'css/variables',
						filter: (/** @type {Object} */ token) =>
							filterRegex.test(token.name),
						options: {
							showFileHeader: false,
						},
					},
				],
			},
		},
	};
};
