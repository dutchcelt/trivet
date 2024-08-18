/**
 * createFragment
 * @param {String} string
 * @return {DocumentFragment}
 */
export const createFragment = string => {
	return document
		.createRange()
		.createContextualFragment(cleanHTML(string, false));
};

/**
 * Sanitize an HTML string
 * (c) 2021 Chris Ferdinandi, MIT License, https://gomakethings.com
 * @param  {String} str - The HTML string to sanitize
 * @param  {boolean} useNodes - If true, returns HTML nodes instead of a string
 * @return {NodeListOf<ChildNode>|String} - The sanitized string or childNodes
 */
function cleanHTML(str, useNodes) {
	/**
	 * Convert the string to an HTML document
	 * @return {HTMLBodyElement} An HTML's body element
	 */
	function stringToHTML(str) {
		let parser = new DOMParser();
		let doc = parser.parseFromString(str, 'text/html');
		return doc.body || document.createElement('body');
	}

	/**
	 * Remove <script> elements
	 * @param  {HTMLBodyElement} html The HTML
	 */
	function removeScripts(html) {
		let scripts = html.querySelectorAll('script');
		for (let script of scripts) {
			script.remove();
		}
	}

	/**
	 * Check if the attribute is potentially dangerous
	 * @param  {String}  name  The attribute name
	 * @param  {String}  value The attribute value
	 * @return {Boolean}       If true, the attribute is potentially dangerous
	 */
	function isPossiblyDangerous(name, value) {
		let val = value.replace(/\s+/g, '').toLowerCase();
		if (['src', 'href', 'xlink:href'].includes(name)) {
			if (val.includes('javascript:') || val.includes('data:')) return true;
		}
		return name.startsWith('on');
	}

	/**
	 * Remove potentially dangerous attributes from an element
	 * @param  {Element} elem The element
	 */
	function removeAttributes(elem) {
		// Loop through each attribute
		// If it's dangerous, remove it
		let atts = elem.attributes;
		for (let { name, value } of atts) {
			if (!isPossiblyDangerous(name, value)) continue;
			elem.removeAttribute(name);
		}
	}

	/**
	 * Remove dangerous stuff from the HTML document's nodes
	 * @param  {HTMLBodyElement} html The HTML document
	 */
	function clean(html) {
		let elements = html.children;
		for (let element of elements) {
			removeAttributes(element);
			clean(element);
		}
	}

	//
	/**
	 * Convert the string to HTML
	 * @type {HTMLBodyElement} html
	 */
	let html = stringToHTML(str);

	// Sanitize it
	removeScripts(html);
	clean(html);

	// If the user wants HTML nodes back, return them
	// Otherwise, pass a sanitized string back
	return useNodes ? html.childNodes : html.innerHTML;
}
