/**
 * Check if a script has already loaded by checking the src attribute of all the scripts elements.
 * @param {string} src
 */
const hasScript = src => [...document.scripts].some(js => encodeURI(src) === js.src);

/**
 * Feature detection for dynamic imports and preload
 */
let hasPreload;
try {
	hasPreload = document.createElement("link").relList.supports("preload");
} catch (err) { console.log("hasPreload: " + err); }


/**
 * Loads an external script asynchronously by inserting it into the head or before the component
 * @param {string} src - location path to script source
 * @param {Element} element
 * @returns {Promise}
 */
const loadScript = (src, element) => {

	const js = document.createElement("script");
	js.async = false;
	js.src = encodeURI(src);
	if (hasScript(js.src)) return Promise.resolve('Script is already loaded: ' + js.src);
	return new Promise((resolve, reject) => {
		js.onload = resolve;
		js.onerror = () => reject("Failed to load script with URL: " + src);
		element
			? element.parentNode.insertBefore(js, component)
			: element.head.appendChild(js);
	});
};



/**
 * Load a stylesheet and preload it if possible to allow for better performance
 * @param {string} href
 * @param {string} media
 * @param {string} crossorigin
 * @param {Element} component
 * @returns {Promise}
 */
const loadStyles = (href, media, crossorigin, component) => {

	if(!href) return Promise.resolve();

	href = encodeURI(href);

	if ([...document.styleSheets].some(link => link.href === href)) return Promise.resolve('Already loaded');

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

	return new Promise((resolve, reject) => {

		css.onload = resolve;
		css.onerror = reject;

		if (hasPreload) {
			preload.onload = () => document.head.appendChild(css);
			preload.onerror = reject
		} else {
			component
				? component.parentNode.insertBefore(css, component)
				: document.body.appendChild(css);
		}
	});
};



export { loadScript, loadStyles }

