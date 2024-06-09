import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';
import { JSDOM } from 'jsdom';
console.log(JSDOM);

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const iconPath = path.join(__dirname, '..', 'icons', 'svg');
const distRootPath = path.join(__dirname, '..', 'dist');
const distPath = path.join(distRootPath, 'svg');
fs.mkdirSync(distPath, { recursive: true });

const temp = (name, data) => `export const ${name} = \`${data}\` `;
const indexTemplate = (name, filename) =>
	`export { ${name} } from "./${filename}.js"\n`;
const spriteTempate =
	data => `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor"
\t stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><defs>${data}</defs></svg>`;

const iconStoreTempate = data =>
	`export const iconStore = Object.freeze({${data}});\nexport const getIconFromStore = (name) => \`<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">\${iconStore[name]}</svg>\`;`;

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
function toPascalCase(str) {
	return str
		.split(/\W|_|-/)
		.map(word => word.charAt(0).toUpperCase() + word.slice(1))
		.join('');
}

const getContentFromFile = filename => {
	const defaultColor = 'currentColor';
	try {
		let content = fs.readFileSync(path.join(iconPath, filename), 'utf8');
		content = content.replace(/"#([0-9a-fA-F]{6,8})"/g, `"${defaultColor}"`);
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
	let indexContent = '';
	let spriteContent = '';
	let iconStoreContent = '';
	files.forEach(file => {
		const data = getContentFromFile(file);
		const doc = new JSDOM(data).window.document;
		const filename = file.split('.')[0];
		const name = `icon${toPascalCase(filename)}`;
		let innertSVG = doc.querySelector('svg').innerHTML;
		iconStoreContent += `${name}:\`${innertSVG.trim()}\`,`;
		spriteContent += `<g id="${name}">${innertSVG}</g>`;
		indexContent += indexTemplate(name, filename);
		const tempdata = temp(name, data);
		fs.writeFileSync(path.join(distPath, `${filename}.js`), tempdata);
	});
	fs.writeFileSync(path.join(distPath, 'index.js'), indexContent);
	fs.writeFileSync(
		path.join(distRootPath, 'sprite.svg'),
		spriteTempate(spriteContent),
	);
	fs.writeFileSync(
		path.join(distRootPath, 'iconStore.js'),
		iconStoreTempate(iconStoreContent),
	);
});
