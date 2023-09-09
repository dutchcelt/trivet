import { default as fs } from 'fs';
import path from 'path';
import prependFile from 'prepend-file';

const buildFolder = path.resolve(`build`);
const bundleFile = path.resolve(buildFolder, `bundle.css`);
const importerFile = path.resolve(buildFolder, `importer.css`);
const cssfileReg = /styles-\w+\.css$/;

try {
	if (!fs.existsSync(buildFolder)) {
		fs.mkdirSync(buildFolder);
	}
} catch (err) {
	console.error(err);
}

fs.writeFileSync(bundleFile, ``);
fs.writeFileSync(importerFile, ``);

const getFileContent = (file) => {
	const data = fs.readFileSync(file, { encoding: 'utf8' });
	/* The only stylesheet with 1 statement is the layer definition file */
	const isLayerDefintionFile = data.toString().match(/;/g).length === 1;
	const transformedData = `${
		isLayerDefintionFile ? '/* Import the hashed files */\n' : ''
	}@import url('${path.basename(file)}');\n`;
	const bufferedData = Buffer.alloc(
		transformedData.length,
		transformedData,
		'utf8'
	);
	if (isLayerDefintionFile) {
		prependFile.sync(bundleFile, `/* Bundle of hashed files */\n${data}\n`);
		prependFile.sync(importerFile, bufferedData);
	} else {
		fs.appendFileSync(bundleFile, `${data}\n`);
		fs.appendFileSync(importerFile, bufferedData);
	}
};

fs.readdir(buildFolder, (err, files) => {
	files.forEach((file) => {
		if (cssfileReg.test(file)) {
			getFileContent(`${buildFolder}/${file}`);
		}
	});
});
