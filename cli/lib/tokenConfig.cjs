const cssPropertyFormat = require('./css-property-formatter.cjs');

/**  @param {Object} opts */
module.exports = (opts) => {
	const filterRegex = new RegExp(opts.exclude, 'i');
	return {
		include: opts.themePath ? [`${opts.sourcePath}/**/[!_]*.json`] : [],
		source: [`${opts.themePath || opts.sourcePath}/**/[!_]*.json`],
		format: {
			...cssPropertyFormat,
		},
		platforms: {
			css: {
				transforms: ['name/cti/kebab'],
				transformGroup: 'css',
				buildPath: `${opts.buildPath}/`,
				prefix: opts.scope,
				files: [
					{
						destination: `${opts.scope}_${opts.filename}`,
						format: 'css/variables',
						filter: (/** @type {Object} */ token) => !filterRegex.test(token.name),
						options: {
							showFileHeader: false,
						},
					},
					{
						destination: `${opts.scope}_properties.css`,
						format: 'css/property',
					},
					{
						destination: `${opts.scope}_${opts.exclude}.css`,
						format: 'css/variables',
						filter: (/** @type {Object} */ token) => filterRegex.test(token.name),
						options: {
							showFileHeader: false,
						},
					},
				],
			},
		},
	};
};
