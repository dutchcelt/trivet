const fs = require('fs');
const createHTML = require('create-html');
const head = require("./fragments/head.js");
const data = require("./data.js");

const renderPath = './dist/';
const content = './templates/content/';

fs.readdir(content, (err, files) => {
	
	files.forEach(file => {
		
		const filename = file.split('.')[0];
		const body = require("./content/" + file);
		const html = createHTML({
			title: data.title + ' - ' + filename,
			head: head(data),
			body: body()
		});
		
		fs.writeFile(renderPath + filename + '.html', html, function (err) {
			if (err) console.log('writeFile',err)
		});
		
	});
	
});

