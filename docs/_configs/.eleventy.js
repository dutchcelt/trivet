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

const trvtStyleSheetPath = path.resolve(
	'..',
	'assets',
	'build',
	'importer.css'
);
const themeStyleSheetPath = path.resolve('.', 'styles', 'index.css');

/**
 * Get the CSS from a style sheet. This also inlines all the CSS imports.
 * @param {string} cssFile - A resolved path to a stylesheet
 * @return {Buffer} - Returns a single minified css string.
 */
const getCSS = cssFile => {
	if (!fs.existsSync(cssFile)) return '';
	const { code } = bundle({
		filename: cssFile,
		minify: true,
	});
	return code;
};

/**
 * Write a bundled css file to 'dist'
 * @param {string[]} distPathArgs - The 'dist' directory path as an array to resolve
 * @param {string} filename - The name of the file to write to disk (i.e. 'styles.css')
 * @param {string[]} styleSheetPaths - An array of style sheet paths to bundle.
 */
const writeCSS = (distPathArgs, filename, styleSheetPaths) => {
	const resolvedPath = path.resolve(...distPathArgs);
	fs.mkdirSync(resolvedPath, { recursive: true }, err => {
		if (err) throw err;
	});
	const resolvedFile = path.resolve(resolvedPath, filename);
	const cssData = styleSheetPaths.reduce((a, c) => (a += getCSS(c)), '');
	fs.writeFileSync(resolvedFile, cssData);
};

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

	writeCSS(['.', 'dist'], 'theme.css', [
		trvtStyleSheetPath,
		themeStyleSheetPath,
	]);

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
	return {
		dir: {
			input: 'content',
			output: 'dist',
		},
	};
};
