module.exports = (opts) => {
	return {
		include: opts.themePath ? [`${opts.sourcePath}/**/*.json`] : [],
		source: [`${opts.themePath || opts.sourcePath}/**/*.json`],
		platforms: {
			css: {
				transforms: ['name/cti/kebab'],
				transformGroup: 'css',
				buildPath: `${opts.buildPath}/`,
				prefix: 'trvt',
				files: [
					{
						destination: opts.file,
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
