import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const iconPath = path.join(__dirname, '..', 'icons', 'svg');
const distPath = path.join(__dirname, '..', 'dist', 'svg');
fs.mkdirSync(distPath, { recursive: true });

const temp = (name, data) => `export const ${name} = \`${data}\` `;

function toCamelCase(str) {
	return str
		.replace(/[\s_-](.)/g, function ($1) {
			return $1.toUpperCase();
		})
		.replace(/[\s_-]/g, '')
		.replace(/^(.)/, function ($1) {
			return $1.toLowerCase();
		});
}

const getContentFromFile = filename => {
	const defaultColor = 'currentColor';
	try {
		let content = fs.readFileSync(path.join(iconPath, filename), 'utf8');
		content = content.replace(/"#([0-9a-fA-F]{6})"/g, `"${defaultColor}"`);
		content = content.replace(/"white"/gi, `"${defaultColor}"`);
		content = content.replace(/"black"/gi, `"${defaultColor}"`);
		return content;
	} catch (err) {
		console.error(`Error reading file from disk: ${err}`);
	}
};

fs.readdir(iconPath, (err, files) => {
	if (err) {
		return console.error(`Unable to scan directory: ${err}`);
	}
	files.forEach(file => {
		const data = getContentFromFile(file);
		const filename = file.split('.')[0];
		const tempdata = temp(toCamelCase(filename), data);
		fs.writeFileSync(distPath + `/${filename}.js`, tempdata);
	});
});
