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
 * @return {Buffer} A single minified css string.
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
 * @param {string} distPath - The 'dist' directory path
 * @param {string} filename - The name of the file to write to disk (i.e. 'styles.css')
 * @param {string[]} styleSheetPaths - An array of style sheet paths to bundle.
 * @returns {string} A hashed filename
 */
const writeCSS = (distPath, filename, styleSheetPaths) => {
	fs.mkdirSync(distPath, { recursive: true }, err => {
		if (err) throw err;
	});
	const cssData = styleSheetPaths.reduce((a, c) => (a += getCSS(c)), '');
	const cssDataHash = Math.abs(hashCode(cssData));
	const hashedFileName = filename.split('.')[0] + '-' + cssDataHash + '.css';
	const resolvedFile = path.resolve(distPath, hashedFileName);
	fs.writeFileSync(resolvedFile, cssData);
	return hashedFileName;
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

/**
 * Returns a hash code from a string
 * @param  {String} str The string to hash.
 * @return {Number} A 32bit integer
 * @see http://werxltd.com/wp/2010/05/13/javascript-implementation-of-javas-string-hashcode-method/
 */
function hashCode(str) {
	let hash = 0;
	for (let i = 0, len = str.length; i < len; i++) {
		let chr = str.charCodeAt(i);
		hash = (hash << 5) - hash + chr;
		hash |= 0; // Convert to 32bit integer
	}
	return hash;
}

module.exports = function(eleventyConfig) {
	eleventyConfig.addPassthroughCopy('fonts');
	eleventyConfig.addPassthroughCopy('images');
	eleventyConfig.addPassthroughCopy('webcomponents');
	eleventyConfig.addPassthroughCopy('scripts');

	isDevelopmentMode || copyImports(eleventyConfig, importArr);

	eleventyConfig.addShortcode('stylesheet', function() {
		let filename = 'theme.css';
		const distPath = path.resolve('.', 'dist');
		const hashedFileName = writeCSS(distPath, filename, [
			trvtStyleSheetPath,
			themeStyleSheetPath,
		]);
		const temp = `<link href="/${hashedFileName}" rel="stylesheet" />`.trim();
		return temp;
	});

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
