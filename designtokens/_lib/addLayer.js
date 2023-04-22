import fs from 'fs';
import path from 'path';

const buildFolder = path.resolve(`build`, `css`);
const cssfileReg = /\.css$/;

try {
	if (!fs.existsSync(buildFolder)) {
		fs.mkdirSync(buildFolder);
	}
} catch (err) {
	console.error(err);
}

const getFileContent = (file) => {
	const data = fs.readFileSync(file, { encoding: 'utf8' });
	const transformedData = `@layer design.tokens {\n${data}\n}\n`;
	const bufferedData = Buffer.alloc(
		transformedData.length,
		transformedData,
		'utf8'
	);

	fs.writeFileSync(file, bufferedData);
};

await fs.readdir(buildFolder, async (err, files) => {
	files.forEach(async (file) => {
		if (cssfileReg.test(file)) {
			await getFileContent(`${buildFolder}/${file}`);
		}
	});
});
