/* eslint-disable no-unused-vars */
// @ts-nocheck

/**
 * @type {Array<{name: string, value: string, syntax: string}>}
 */
const propertyDefinitions = [
	{ name: 'display', value: 'block', syntax: 'block|none' },
	{
		name: 'position',
		value: 'static',
		syntax: 'static|relative|absolute|fixed|sticky',
	},
	{ name: 'width', value: '100%', syntax: '<length>|<percentage>' },
	{ name: 'height', value: 'auto', syntax: '<length>|<percentage>|auto' },
];

/**
 * Registers a given property with the CSS.registerProperty method.
 * @param {string} namespace - The namespace for the property name.
 * @param {string} component - The component for the property name.
 * @param {{name: string, value: string, syntax: string}} property - Property object.
 */
function registerProperty(namespace, component, property) {
	CSS.registerProperty({
		name: `--${namespace}-${component}-${property.name}`,
		syntax: property.syntax,
		inherits: false,
		initialValue: property.value,
	});
}

/**
 * Registers all base properties using a given configuration object and the registerProperty function.
 * @param {{namespace?: string, component?: string, props: Array<{name: string, value: string, syntax: string}>}} param0 - Parameters object.
 */

/**
 * Registers base properties for a given namespace and component.
 *
 * @param {string} namespace - The namespace to register the properties under.
 * @param {string} component - The component to register the properties for.
 * @param {object} props - Additional properties to register (optional).
 */
function registerBaseProperties({
	namespace = 'trvt',
	component = 'component',
	props,
}) {
	const properties = Object.assign({}, propertyDefinitions, props);
	for (const prop of properties) {
		registerProperty(namespace, component, prop);
	}
}
