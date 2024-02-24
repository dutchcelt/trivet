const env = process.env;
const path = require('path');
const fs = require('fs');
const writeCSSImport = import(
	path.resolve('..', 'assets', 'lib', 'writeCSS.js')
);

let importscope = '@trvt';
let scopeReg = new RegExp(importscope, 'i');

const depsFile = fs.readFileSync(path.resolve('.', 'package.json'));
const depsObject = JSON.parse(depsFile.toString());
const importArr = Object.keys(depsObject.devDependencies).filter(key =>
	scopeReg.test(key)
);

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

module.exports = function (eleventyConfig) {
	eleventyConfig.addPassthroughCopy('fonts');
	eleventyConfig.addPassthroughCopy('images');
	eleventyConfig.addPassthroughCopy('webcomponents');
	eleventyConfig.addPassthroughCopy('scripts');

	isDevelopmentMode || copyImports(eleventyConfig, importArr);

	eleventyConfig.addShortcode('stylesheet', async function () {
		const { writeCSS } = await writeCSSImport;

		const trivetPath = path.resolve('..', 'assets', 'build', 'importer.css');
		const themePath = path.resolve('.', 'styles', 'index.css');

		let filename = 'theme.css';
		const distPath = path.resolve('.', 'dist');
		const hashedFileName = writeCSS(distPath, filename, [
			trivetPath,
			themePath,
		]);
		const temp = `<link href="/${hashedFileName}" rel="stylesheet" />`.trim();
		return temp;
	});

	eleventyConfig.addShortcode('importmap', function () {
		const temp = `
				<script type="importmap">
					{
						"imports": ${createImportmap(importArr)}
					}
				</script>
			`.trim();
		return temp;
	});
	eleventyConfig.addShortcode('importmodules', function () {
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
