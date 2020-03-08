// Validation and type check
const badTag = /script|template|iframe|object/i;
const validNode = node => node.nodeType === 1 && !badTag.test(node.tagName);

// parse html string and return DOM nodes
const getNodes = string => {
	const html = (new DOMParser().parseFromString(string, "text/html"));
	return html.body.childNodes;
};
// Append node(s) to a given fragment
const appendNodesToFragment = (fragment, ...nodes) => {
	nodes.forEach(node => validNode(node) && fragment.appendChild(node));
};

/**
 * Parse the string as text/html and then return it as a DocumentFragment.
 * @param templates {String,}
 * @returns {DocumentFragment}
 */
export default (...templates) => {
	const fragment = document.createDocumentFragment();
	templates.forEach(html => appendNodesToFragment(fragment, ...getNodes(html)));
	return fragment;
};

