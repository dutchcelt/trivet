const express = require('express'),
	es6Renderer = require('express-es6-template-engine'),
	router = express.Router(),
	app = express();

app.engine('html', es6Renderer);
app.set('views', 'templates');
app.set('view engine', 'html');

app.use(router);
app.use('/', express.static('dist'));

const trivetData = require('./templates/data.js');
const menuData = { menu: JSON.stringify([{
		"text":"Home",
		"url":"/"
	}, {
		"text":"About",
		"url":"/textContent.html"
	}]
)};
const fragments = require('./templates/fragments/fragments.js');

router.all('/', function (req, res, next) {
	res.render('index', {
		locals: Object.assign(trivetData, menuData,{
			title: 'Hello, Welcome to Trivet!',
			content: 'Trivet is a very simple approach to the dynamic loading of scripts, styles, and json.<br> Look' +
				' into <a href="https://github.com/andreasbm/router-slot">router slot</a>'
		}),
		partials: Object.assign(fragments,{
			main: '/content/index'
		})
	});
});
router.all('/textContent.html', function (req, res, next) {
	res.render('index', {
		locals: Object.assign(trivetData, menuData,{
			title: 'This is a Text Content test!',
			content:''
		}),
		partials: Object.assign(fragments,{
			main: '/content/textContent'
		})
	});
});

app.listen(9000);

module.exports = app;


