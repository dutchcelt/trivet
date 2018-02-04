import {loadScript, loadStyles, loadJSON, normalisePath} from "./utils/loader.js";

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

const resolveScript = (filepath, elem) => {
	if (typeof loaderMap.get(filepath) === 'function') {
		return Promise.resolve(loaderMap.get(filepath)(elem));
	} else {
		return loadScript(filepath).then(response => {
			loaderMap.set(filepath, response.default || response);
			if (response.default) response.default(elem);
			return response.default || response;
		});
	}
};
const resolveJson = filepath => {
	if (loaderMap.get(filepath)) {
		return Promise.resolve(loaderMap.get(filepath));
	} else {
		return loadJSON(filepath).then(response => {
			loaderMap.set(filepath, response);
			return response;
		});
	}
};


/**
 * Loads a components defined the config module by matching the corresponding hook.
 * A component consists of a single script that may optionally be paired with a stylesheet and or template.
 * @param {Element} elem
 * @param {Object} settings
 */
const loadTrivet = (elem, settings) => {
	if (!settings || !settings.paths) return;
	const key = elem.dataset[defaults.name];
	
	settings.paths[key].sort(a => /\.json$/ig.test(a) && -1);
	
	const loader = array => {
		const loaders = [];
		array.forEach(file => {
			const filepath = /^http/ig.test(file) ? file : normalisePath(`${settings.basePath}/${key}/${file}`);
			try {
				const ext = /\.(\w{2,4})$/ig.exec(file)[1];
				switch (ext) {
					case 'js':
						loaders.push(resolveScript(filepath, elem));
						break;
					case 'css':
						loaders.push(loadStyles(filepath, elem));
						break;
					case 'json':
						loaders.push(resolveJson(filepath));
						break;
					default:
						console.log('file extention ' + ext + ' will not be loaded');
				}
			} catch (error) {
				reject(error)
			}
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
