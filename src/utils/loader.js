// Register each loaded file;
const loaderSet = new Set();


/**
 * Convert (normalise) a path to a full URL.
 * @param path
 * @returns {string}
 */
const normalisePath = path => /^http/ig.test(path)
	? encodeURI(path)
	: encodeURI(`${location.protocol}//${location.host}${path}`);

/**
 * Feature detection for preloading styles
 */
let hasPreload;
try {
	hasPreload = document.createElement("link").relList.supports("preload");
} catch (err) { console.log("hasPreload: " + err); }


/**
 * Loads an external script asynchronously by inserting it into the head or before the component
 * @param {string} src - location path to script source
 * @returns {Promise}
 */
const loadScript = src => {
	const js = document.createElement("script");
	js.async = false;
	js.src = normalisePath(src);
	if (loaderSet.has(js.src)) return Promise.resolve('Script is already loaded: ' + js.src);
	loaderSet.add(js.src);
	
	return new Promise((resolve, reject) => {
		js.onload = resolve;
		js.onerror = () => reject("Failed to load script with URL: " + src);
		document.head.appendChild(js);
	});
	
};

let loadModule = async filepath => {
	try {
		return new Function('filepath', 'return import(filepath)')(filepath);
	} catch (err) {
		await loadScript('/system.js');
		return SystemJS.import(filepath);
	}
	
};



/**
 * Load a stylesheet and preload it if possible to allow for better performance
 * @param {string} path
 * @param {string} media
 * @param {string} crossorigin
 * @param {Element} element
 * @returns {Promise}
 */
const loadStyles = (path, element, media, crossorigin) => {

	if(!path) return Promise.resolve();
	
	const href = normalisePath(path);

	if (loaderSet.has(href)) return Promise.resolve('Already loaded');

	let preload;
	if (hasPreload) {
		preload = document.createElement("link");
		preload.href = href;
		preload.as = 'style';
		preload.rel = 'preload';
		if (crossorigin) preload.crossorigin = crossorigin;
		document.head.appendChild(preload);
	}

	const css = document.createElement("link");
	css.href = href;
	css.media = media || 'screen';
	css.rel = 'stylesheet';
	loaderSet.add(css.href);

	return new Promise((resolve, reject) => {

		css.onload = resolve;
		css.onerror = reject;

		if (hasPreload) {
			preload.onload = () => document.head.appendChild(css);
			preload.onerror = reject
		} else {
			element
				? element.parentNode.insertBefore(css, element)
				: document.body.appendChild(css);
		}
	});
};

/**
 * Return an object from a JSON file.
 * @param path
 * @returns {Promise}
 */
const loadJSON = path => {
	const filePath = normalisePath(path);
	if (loaderSet.has(filePath)) return Promise.resolve('Already loaded');
	
	return new Promise((resolve, reject) => {
		try {
			fetch(filePath).then(r => {
				loaderSet.add(r.url);
				resolve(r.json());
			});
		} catch (error) {
			reject(error);
		}
	});
};



export { loadModule, loadScript, loadStyles, loadJSON, normalisePath, loaderSet}

