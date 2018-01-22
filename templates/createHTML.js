const fs = require('fs-extra');
const createHTML = require('create-html');
const dir = require('node-dir');

const head = require("./fragments/head.js");
const navigation = require("./fragments/navigation.js");
const footer = require("./fragments/footer.js");
const data = require("./data.js");

const renderPath = './dist/';
const contentPath = __dirname + '/content/';

const filePaths = dir.files(contentPath, {sync:true});
const relativePaths = filePaths.map(p => p.replace(contentPath,''));

const files = dir.files(contentPath, {sync:true,shortName:true});
const fileNames = files.map(f => f.replace(/\.js$/, ''));


const generateHTML = (file, nodeString) => {
	fs.ensureFile(file).then(() => {
		fs.appendFile(file, nodeString, err => {
			if (err) console.log('appendFile: ',err)
		});
	});
};

const getContentHTML = (index) => {
	
	const main = require(filePaths[index]);
	return createHTML({
		title: data.title + ' - ' + fileNames[index],
		head: head(data),
		body: navigation(fileNames) + '<main>' + main() + '</main>' + footer()
	});
};

relativePaths.forEach((path, index) => {

	const file = renderPath + relativePaths[index].replace('.js', '.html');
	const nodeString = getContentHTML(index);

	generateHTML(file, nodeString, index);
});


