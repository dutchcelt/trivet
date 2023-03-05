import { default as fs, unlink } from 'fs';
import path from 'path';

const buildFolder = path.resolve(`build`);
const bundleFile = path.resolve(buildFolder, `bundle.css`);

try {
	if (!fs.existsSync(buildFolder)) {
		fs.mkdirSync(buildFolder);
	}
} catch (err) {
	console.error(err);
}

fs.writeFileSync(bundleFile, `/* Special bundle of hashed files */\n`);

const getFileContent = (file) => {
	const data = fs.readFileSync(file, { encoding: 'utf8' });
	fs.appendFile(bundleFile, data);
};

await fs.readdir(buildFolder, async (err, files) => {
	files.forEach(async (file) => {
		if (/styles-\w+\.css$/.test(file)) {
			await getFileContent(`${buildFolder}/${file}`);
		}
	});
});
