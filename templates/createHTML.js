const fs = require('fs-extra');
const createHTML = require('create-html');
const dir = require('node-dir');
const path = require('path');

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


const createHTMLFile = (file, nodeString) => {
	fs.ensureDir(path.dirname(file)).then(() => {
		fs.writeFile(file, nodeString, err => {
			if (err) console.log('appendFile: ',err)
		});
	});
};

const createHTMLString = (index) => {
	
	const main = require(filePaths[index]);
	return createHTML({
		title: data.title + ' - ' + fileNames[index],
		head: head(data),
		body: navigation(relativePaths) + '<main>' + main() + '</main>' + footer()
	});
};

relativePaths.forEach((path, index) => {

	const file = renderPath + relativePaths[index].replace('.js', '.html');
	const nodeString = createHTMLString(index);
	
	createHTMLFile(file, nodeString, index);
});


