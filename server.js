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
const fragments = require('./templates/fragments/fragments.js');

router.all('/', function (req, res, next) {
	res.render('index', {
		locals: Object.assign(trivetData,{
			title: 'Hello, Welcome to Trivet!',
			content: 'Trivet is a very simple approach to the dynamic loading of scripts, styles, and json.'
		}),
		partials: Object.assign(fragments,{
			page: '/content/page',
			main: '/content/index'
		})
	});
});
router.all('/textContent.html', function (req, res, next) {
	res.render('index', {
		locals: Object.assign(trivetData,{
			title: 'This is a Text Content test!',
			content:''
		}),
		partials: Object.assign(fragments,{
			page: '/content/page',
			main: '/content/textContent'
		})
	});
});

app.listen(9000);

module.exports = app;


