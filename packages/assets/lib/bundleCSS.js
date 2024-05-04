import * as fs from 'fs';
import * as path from 'path';
import * as prependFile from 'prepend-file';

const buildFolder = path.resolve(`build`);
const bundleFile = path.resolve(buildFolder, `bundle.css`);
const importerFile = path.resolve(buildFolder, `importer.css`);
const cssfileReg = /styles-\w+\.css$/;

fs.mkdirSync(buildFolder, { recursive: true });
fs.writeFileSync(bundleFile, ``);
fs.writeFileSync(importerFile, ``);

const getFileContent = file => {
	const data = fs.readFileSync(file, { encoding: 'utf8' });
	/* The only stylesheet with 1 statement is the layer definition file */
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
