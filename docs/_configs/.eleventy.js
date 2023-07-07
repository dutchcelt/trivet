module.exports = function (eleventyConfig) {
	eleventyConfig.addPassthroughCopy('fonts');
	eleventyConfig.addPassthroughCopy('images');
	eleventyConfig.addPassthroughCopy('styles');
	eleventyConfig.addPassthroughCopy('webcomponents');
	// Return your Object options:
	return {
		dir: {
			input: 'content',
			output: 'dist',
		},
	};
};
['_site/**/*.css'];
