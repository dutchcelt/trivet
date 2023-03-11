import { default as fs } from 'fs';
import path from 'path';

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

fs.writeFileSync(bundleFile, `/* Bundle of hashed files */\n`);
fs.writeFileSync(importerFile, `/* Import the hashed files */\n`);

const getFileContent = (file) => {
	const data = fs.readFileSync(file, { encoding: 'utf8' });
	fs.appendFileSync(bundleFile, data);
	const transformedData = `@import url('${path.basename(file)}');\n`;
	const bufferedData = Buffer.alloc(
		transformedData.length,
		transformedData,
		'utf8'
	);
	fs.appendFileSync(importerFile, bufferedData);
};

await fs.readdir(buildFolder, async (err, files) => {
	files.forEach(async (file) => {
		if (cssfileReg.test(file)) {
			await getFileContent(`${buildFolder}/${file}`);
		}
	});
});
