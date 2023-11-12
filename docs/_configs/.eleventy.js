const env = process.env;
const path = require('path');
const fs = require('fs');
const { bundle } = require('lightningcss');

let importscope = '@trvt';
let scopeReg = new RegExp(importscope, 'i');

const depsFile = fs.readFileSync(path.resolve('.', 'package.json'));
const depsObject = JSON.parse(depsFile);
const importArr = Object.keys(depsObject.devDependencies).filter(key =>
	scopeReg.test(key)
);
const getCSS = cssFile => {
	if (!fs.existsSync(cssFile)) return '';
	const { code } = bundle({
		filename: cssFile,
		minify: true,
	});
	return code;
};
const trvtCSS = path.resolve('..', 'assets', 'build', 'importer.css');
const themeCSS = path.resolve('.', 'styles', 'index.css');

const copyImports = (eleventyConfig, deps) => {
	deps.forEach(dep => {
		eleventyConfig.addPassthroughCopy({
			[`../node_modules/${dep}/build`]: `${dep}`,
		});
	});
};

const isDevelopmentMode = env.ELEVENTY_RUN_MODE !== 'build';
const packagePath = '';

const createImportmap = deps => {
	const obj = {};
	deps.forEach(dep => (obj[dep] = `${packagePath}/${encodeURI(dep)}/index.js`));
	return JSON.stringify(obj);
};
const moduleImporter = deps => {
	let str = '';
	deps.forEach(d => {
		str += `import '${d}';\n`;
	});
	return str;
};

module.exports = function(eleventyConfig) {
	eleventyConfig.addPassthroughCopy('fonts');
	eleventyConfig.addPassthroughCopy('images');
	eleventyConfig.addPassthroughCopy('webcomponents');
	eleventyConfig.addPassthroughCopy('scripts');
	fs.writeFileSync(
		path.resolve('.', 'dist', 'theme.css'),
		getCSS(trvtCSS) + getCSS(themeCSS)
	);

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
