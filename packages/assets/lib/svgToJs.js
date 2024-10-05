import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';
import { parse } from 'node-html-parser';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const iconPath = path.join(__dirname, '..', 'icons', 'svg');
const distRootPath = path.join(__dirname, '..', 'dist');
const distPath = path.join(distRootPath, 'icons');
fs.mkdirSync(distPath, { recursive: true });

const defaultColor = 'currentColor';

const temp = data =>
	`import { createFragment } from '@trvt/core';\nexport default createFragment(\`${data}\`);`;

/**
 * An SVG defs template with the given data.
 *
 * @param {String} data - The data to be embedded in the SVG template.
 * @returns {String} The SVG template with the embedded data.
 */
const spriteTempate = data => {
	return `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="${defaultColor}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><defs>${data}</defs></svg>`;
};

/**
 * An icon store template.
 *
 * @param {string} data - The icon data to be included in the store.
 * @return {string} - The generated icon store template.
 */
const iconStoreTemplate = data => {
	return `import { createFragment } from '@trvt/core';\nexport const iconStore = Object.freeze({${data}});\nexport const getIconFromStore = (svgID) => createFragment(\`<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="${defaultColor}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">\${iconStore[svgID]}</svg>\`).firstChild;`;
};
function toPascalCase(str) {
	return str
		.split(/\W|_|-/)
		.map(word => word.charAt(0).toUpperCase() + word.slice(1))
		.join('');
}

const getContentFromFile = filename => {
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

fs.readdir(iconPath, async (err, files) => {
	if (err) {
		return console.error(`Unable to scan directory: ${err}`);
	}
	let indexContent = '';
	let spriteContent = '';
	let iconStoreContent = '';
	files.forEach(file => {
		const filename = file.split('.')[0];
		const svgID = `icon${toPascalCase(filename)}`;

		const svgOuterHTML = getContentFromFile(file);

		const root = parse(svgOuterHTML);
		const svgInnerHTML = root.querySelector('svg').innerHTML;

		iconStoreContent += `${svgID}:\`${svgInnerHTML.trim()}\`,`;
		spriteContent += `<g id="${svgID}">${svgInnerHTML}</g>`;
		fs.writeFileSync(path.join(distPath, `${filename}.js`), temp(svgOuterHTML));
	});
	fs.writeFileSync(
		path.join(distRootPath, 'sprite.svg'),
		spriteTempate(spriteContent),
	);
	fs.writeFileSync(
		path.join(distRootPath, 'iconStore.js'),
		iconStoreTemplate(iconStoreContent),
	);
});
