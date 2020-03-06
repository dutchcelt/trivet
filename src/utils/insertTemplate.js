/**
 * Insert the content for the template and then return it as a Node Element.
 * @param string {string}
 * @param element {Element}
 * @returns {Node}
 */
export default function (string, element) {
	const newNode = createFragment(string);
	if(/^template|-template$/i.test(element.tagName)) {
		[...element.attributes].forEach(a => newNode.setAttribute(a.name, a.value));
		element.parentNode.replaceChild(newNode, element);
	} else {
		element.appendChild(newNode);
	}
	return newNode;
}

export function createFragment(string) {
	const fragment = document.createDocumentFragment();
	const parser = new DOMParser().parseFromString(string, "text/html");
	return fragment.appendChild(parser.body.firstElementChild);
}

