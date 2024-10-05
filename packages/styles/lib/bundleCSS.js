import * as fs from 'fs';
import * as path from 'path';
import * as prependFile from 'prepend-file';

const buildFolder = path.resolve(`dist`);
const bundleFile = path.resolve(buildFolder, `bundle.css`);
const importerFile = path.resolve(buildFolder, `importer.css`);
const cssfileReg = /styles-\w+\.css$/;

fs.mkdirSync(buildFolder, { recursive: true });
fs.writeFileSync(bundleFile, ``);
fs.writeFileSync(importerFile, ``);

/**
 * Reads the content of a file and performs transformations based on the file type.
 *
 * @param {string} file - The path to the file to read.
 * @returns {void}
 */
const getFileContent = file => {
	const data = fs.readFileSync(file, { encoding: 'utf8' });
	// @ts-expect-error
	const isLayerDefintionFile = data.toString().match(/;/g).length === 1;
	const transformedData = `${
		isLayerDefintionFile ? '/* Import the hashed files */\n' : ''
	}@import url('${path.basename(file)}');\n`;
	if (isLayerDefintionFile) {
		prependFile.sync(bundleFile, `/* Bundle of hashed files */\n${data}\n`);
		prependFile.sync(importerFile, transformedData);
	} else {
		fs.appendFileSync(bundleFile, `${data}\n`);
		fs.appendFileSync(importerFile, transformedData);
	}
};

fs.readdir(buildFolder, (err, files) => {
	if (err) throw err;
	files.forEach(file => {
		if (cssfileReg.test(file)) {
			getFileContent(`${buildFolder}/${file}`);
		}
	});
});
