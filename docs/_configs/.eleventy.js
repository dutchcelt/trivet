const env = process.env;
const fs = require('fs');

let importscope = '@trvt';
let scopeReg = new RegExp(importscope, 'i');

const depsFile = fs.readFileSync('./package.json');
const depsObject = JSON.parse(depsFile);
const importArr = Object.keys(depsObject.dependencies).filter((key) =>
	scopeReg.test(key)
);
const copyImports = (eleventyConfig, deps) => {
	deps.forEach((dep) => {
		eleventyConfig.addPassthroughCopy({
			[`../node_modules/${dep}/build`]: `${dep}`,
		});
	});
};

const isDevelopmentMode = env.ELEVENTY_RUN_MODE !== 'build';

const createImportmap = (deps) => {
	const obj = {};
	deps.forEach((dep) => (obj[dep] = `/${encodeURI(dep)}/index.js`));
	return JSON.stringify(obj);
};

module.exports = function (eleventyConfig) {
	eleventyConfig.addWatchTarget('../webcomponents/*/');

	eleventyConfig.addPassthroughCopy('fonts');
	eleventyConfig.addPassthroughCopy('images');
	eleventyConfig.addPassthroughCopy('styles');
	eleventyConfig.addPassthroughCopy('webcomponents');

	isDevelopmentMode || copyImports(eleventyConfig, importArr);

	eleventyConfig.addShortcode('importmap', function () {
		const temp = `
				<script type="importmap">
					{
						"imports": ${createImportmap(importArr)}
					}
				</script>
			`.trim();
		return isDevelopmentMode ? '' : temp;
	});
	// Return your Object options:
	return {
		dir: {
			input: 'content',
			output: 'dist',
		},
	};
};
['_site/**/*.css'];
