const fs = require('fs');
const path = require('path');

const flags = process.argv.filter((f) => /--/.test(f));
const opts = {
	buildPath: path.resolve(`build`, `css`),
	layer: 'design.tokens',
	sourcePath: 'tokens',
	themePath: undefined,
	file: `trvt_tokens.css`,
};
flags.forEach((f) => {
	const [key, value] = f.substring(2).split('=');
	opts[key] = value;
});

try {
	if (!fs.existsSync(opts.buildPath)) {
		fs.mkdirSync(opts.buildPath);
	}
} catch (err) {
	console.error(err);
}

const StyleDictionary = require('style-dictionary').extend({
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
});

StyleDictionary.buildAllPlatforms();

const getFileContent = (file) => {
	const data = fs.readFileSync(file, { encoding: 'utf8' });
	const transformedData = `@layer ${opts.layer} {\n${data}\n}\n`;
	const bufferedData = Buffer.alloc(
		transformedData.length,
		transformedData,
		'utf8'
	);

	fs.writeFileSync(file, bufferedData);
};

getFileContent(`${opts.buildPath}/${opts.file}`);
