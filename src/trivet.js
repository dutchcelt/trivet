import {loadModule, loadScript, loadStyles, loadJSON, normalisePath, loaderSet} from "./utils/loader.js";

/* config default */
const defaults = {};
defaults.name = 'trivet';
defaults.hookAttr = 'data-' + defaults.name;
defaults.basePath = '/';

// Add response to each loaded file
const loaderMap = new Map();

document.styleSheets[0].insertRule(`[${defaults.hookAttr}] { display:none !important; }`, 1);

const elements = document.body.getElementsByTagName('*');

const getElementsByAttribute = attr => {
	const arr = [];
	for (let i = elements.length; i--;) {
		elements[i].hasAttribute(attr) && arr.push(elements[i]);
	}
	return arr;
};

/**
 *
 * @param {string} f - filepath
 * @param {*} r - response return from a promise
 * @param {Element} e - optional element to pass to default function
 * @returns {*}
 */
const resolveResponse = (f, r, e = null) => {
	loaderMap.set(f, r.default || r);
	const fn = e && typeof r.default === 'function';
	return fn && r.default(e) || r;
};
/**
 *
 * @param filepath
 * @returns {Promise}
 */
const getLoaderObject = filepath => {
	const o = loaderMap.get(filepath);
	return Promise.resolve(typeof o === 'function' ? o() : o);
};


const getLoadFunction = (filepath, module) => {
	const ext = /[\.|#](\w+)$/ig.exec(filepath + module).pop();
	const loaderObject = {
		'module': loadModule,
		'js': loadScript,
		'css': loadStyles,
		'json': loadJSON
	};
	return loaderObject[ext](filepath);

};

const resolveLoader = (filepath, elem, module) => {
	
	return loaderSet.has(filepath)
		? getLoaderObject(filepath)
		: getLoadFunction(filepath, module)
			.then(response => resolveResponse(filepath, response, elem));
	
};


/**
 * Loads a components defined the config module by matching the corresponding hook.
 * A component consists of a single script that may optionally be paired with a stylesheet and or template.
 * @param {Element} elem
 * @param {Object} settings
 */
const loadTrivet = (elem, settings) => {
	
	if (!settings || !settings.paths) return;
	const key = elem.dataset[settings.name];
	
	settings.paths[key].sort(a => /\.json$/ig.test(a) && -1);
	
	const loader = array => {
		const loaders = [];
		array.forEach(file => {
			const href = /^http/ig.test(file) ? file : normalisePath(`${settings.basePath}/${key}/${file}`);
			const url = new URL(href);
			const filepath = url.origin + url.pathname;
			const module = url.hash;
			loaders.push(resolveLoader(filepath, elem, module));
			
		});
		return Promise.all(loaders);
		
	};
	
	/**
	 * Last load cycle that will remove the style attribute
	 */
	const finalLoader = () => loader(settings.paths[key]).then(() => {
		elem.removeAttribute(settings.hookAttr);
	});
	
	if (/\.json$/ig.test(settings.paths[key][0])) {
		loader([settings.paths[key].shift()]).then(response => {
			loader(Object.values(response[0])[0]).then(finalLoader);
		});
	} else {
		finalLoader();
	}
};


/**
 * Look for all hooks and trigger
 * @param {object} opts
 */
const trivet = function (opts = {}) {
	loadJSON(`/${defaults.name}.json`).then(json => {
		const settings = Object.create(defaults);
		Object.assign(settings, json, opts);
		
		getElementsByAttribute(settings.hookAttr).forEach(elem => {
			setImmediate(loadTrivet, elem, settings);
		});
		
	});
	
};


(/d$|^i|^c/).test(document.readyState) ? setImmediate(trivet) : document.addEventListener('DOMContentLoaded', trivet);


export {trivet as default, elements};
