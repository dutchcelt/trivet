const badTag = /script|template|iframe|object/ig;

/**
 * Parse the string as text/html and then return it as a DocumentFragment.
 * @param string {string}
 * @returns {DocumentFragment}
 */
export default (string) => {
	const fragment = document.createDocumentFragment();
	const parser = new DOMParser().parseFromString(string, "text/html");
	[...parser.body.childNodes].forEach(node => {
		if(node.nodeType === 1 && !badTag.test(node.tagName)) fragment.appendChild(node);
	});
	return fragment;
};

