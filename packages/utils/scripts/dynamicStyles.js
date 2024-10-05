/**
 * Represents a dynamic style object for add Custom properties to a root node.
 * @param {HTMLElement|Node|ChildNode} elem - The target element.
 * @returns {Object} - The dynamic style object.
 */
const dynamicStyles = (elem = document.documentElement) => {
	const cssRule = Symbol();
	const addProp = Symbol();
	const rootNode = elem.getRootNode();
	const isShadow = rootNode && rootNode instanceof ShadowRoot;
	/**
	 * @param {ShadowRoot|Document} root
	 * @param {HTMLElement} [root.host]
	 */
	const root = isShadow ? rootNode : document;

	const sheet = new CSSStyleSheet();
	sheet.replaceSync(`
		@layer ${isShadow ? 'components.modifiers' : 'design.tokens'} { 
			${isShadow ? ':host' : ':root'} { } 
		}
	`);
	root.adoptedStyleSheets.push(sheet);

	/** @type {CSSRule} */
	// @ts-expect-error
	const cssRules = sheet.cssRules[0].cssRules[0];

	if (elem && CSS.supports('selector(:playing)')) {
		// @ts-expect-error
		elem.style?.setProperty(`--${crypto.randomUUID()}`, 'invalidate styles');
	}

	return Object.freeze({
		[cssRule]: cssRules,
		/**
		 * Adds a CSS property to the element's styles.
		 * @param {string} prop - The CSS property to add in the format "property: value".
		 */
		[addProp](prop) {
			const [propName, propValue] = prop.replace(/;|\s/gi, '').split(':');
			this.styles.setProperty(propName, propValue);
		},
		/**
		 * Retrieves the styles of the current CSS rule.
		 * @returns {CSSStyleDeclaration} The styles associated with the CSS rule.
		 */
		get styles() {
			// @ts-expect-error
			return this[cssRule]?.style;
		},
		/**
		 * Sets the properties of the object.
		 * @param {string[]|string} properties - The properties to set. If an array is provided,
		 *   it will be flattened before setting the properties.
		 *   Each property must be an object containing key-value pairs representing the property name
		 *   and its corresponding value.
		 */
		set properties(properties) {
			[properties].flat().forEach(this[addProp].bind(this));
		},
	});
};

export { dynamicStyles };
