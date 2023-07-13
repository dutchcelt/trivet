module.exports = (opts) => {
	return {
		include: opts.themePath ? [`${opts.sourcePath}/**/*.json`] : [],
		source: [`${opts.themePath || opts.sourcePath}/**/*.json`],
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
						options: {
							showFileHeader: false,
						},
					},
				],
			},
		},
	};
};
