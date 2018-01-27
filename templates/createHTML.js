const fs = require('fs-extra');
const createHTML = require('create-html');
const dir = require('node-dir');
const path = require('path');

const head = require("./fragments/head.js");
const navigation = require("./fragments/navigation.js");
const footer = require("./fragments/footer.js");
const data = require("./data.js");
const pages = require("./content.js");

const packageJSON = fs.readJSON('./package.json');


const distPath = path.resolve(process.cwd(), './dist');
const contentPath = __dirname + '/content';
const filePaths = dir.files(contentPath, {sync:true});
const fileObjects = filePaths.reduce((a,f) => a.concat(path.parse(f)), []);


const createHTMLFile = (file, nodeString) => {
	fs.ensureDir(path.dirname(file)).then(() => {
		fs.writeFile(file, nodeString, err => {
			if (err) console.log('appendFile: ',err)
		});
	});
};

const createHTMLString = async fileObj => {
	
	const main = require(path.format(fileObj));
	const content = pages[fileObj.name];
	const pkg = await packageJSON;
	
	return createHTML({
		title: pkg.name + ' - ' + fileObj.name,
		head: head(data),
		body: navigation(fileObjects) + '<main>' + main(content) + '</main>' + footer()
	});
};

fileObjects.forEach(async obj => {
	const file = path.format({
		dir: obj.dir.replace(contentPath, distPath),
		name: obj.name,
		ext: '.html',
	});
	const nodeString = await createHTMLString(obj);
	createHTMLFile(file, nodeString);
});

