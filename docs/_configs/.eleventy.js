const env = process.env;
const fs = require('fs');

let importscope = '@trvt';
let scopeReg = new RegExp(importscope, 'i');

const depsFile = fs.readFileSync('./package.json');
const depsObject = JSON.parse(depsFile);
const importArr = Object.keys(depsObject.dependencies).filter((key) => scopeReg.test(key));
const copyImports = (eleventyConfig, deps) => {
	deps.forEach((dep) => {
		eleventyConfig.addPassthroughCopy({
			[`../node_modules/${dep}/build`]: `${dep}`,
		});
	});
};

const isDevelopmentMode = env.ELEVENTY_RUN_MODE !== 'build';
const packagePath = '';

const createImportmap = (deps) => {
	const obj = {};
	deps.forEach((dep) => (obj[dep] = `${packagePath}/${encodeURI(dep)}/index.js`));
	return JSON.stringify(obj);
};
const moduleImporter = (deps) => {
	let str = '';
	deps.forEach((d) => {
		str += `import '${d}';\n`;
	});
	return str;
};

module.exports = function(eleventyConfig) {
	eleventyConfig.addPassthroughCopy('fonts');
	eleventyConfig.addPassthroughCopy('images');
	eleventyConfig.addPassthroughCopy('styles');
	eleventyConfig.addPassthroughCopy('webcomponents');
	eleventyConfig.addPassthroughCopy('scripts');

	isDevelopmentMode || copyImports(eleventyConfig, importArr);

	eleventyConfig.addShortcode('importmap', function() {
		const temp = `
				<script type="importmap">
					{
						"imports": ${createImportmap(importArr)}
					}
				</script>
			`.trim();
		return temp;
	});
	eleventyConfig.addShortcode('importmodules', function() {
		const temp = `
				<script type="module">
					${moduleImporter(importArr)}
				</script>
			`.trim();
		return temp;
	});

	// eleventyConfig.addFilter("makeUppercase", function(value) {
	//
	//  });

	// Return your Object options:
	return {
		dir: {
			input: 'content',
			output: 'dist',
		},
	};
};
