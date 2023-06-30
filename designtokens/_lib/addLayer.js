import fs from 'fs';
import path from 'path';

const buildFolder = path.resolve(`build`, `css`);
const cssfileReg = /\.css$/;

const flags = process.argv.filter((f) => /--/.test(f));
const opts = {};
flags.forEach((f) => {
	const [key, value] = f.substring(2).split('=');
	opts[key] = value;
});

try {
	if (!fs.existsSync(buildFolder)) {
		fs.mkdirSync(buildFolder);
	}
} catch (err) {
	console.error(err);
}

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
await getFileContent(`${buildFolder}/${opts.file}`);
