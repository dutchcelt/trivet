module.exports = {
	path: '/',
	styles: 'styles.css',
	polyfillService: '//cdn.polyfill.io/v2/polyfill.js',
	polyfillFeatures: 'setImmediate,fetch,Object.create,Promise,es6',
	systemjs: 'https://cdnjs.cloudflare.com/ajax/libs/systemjs/0.21.0/system.js',
	importmapShim:"es-module-shims.min.js",
	importmap: 'dependencies.importmap',
	adoptedStyleSheets: 'adoptedStyleSheets.js',
	trivet: 'trivet.js',
};
