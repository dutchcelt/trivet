/**
 * @example import styles from './styles.css' with { type: 'css' };
 * @param {import('estree-walker').Node} node
 * @returns {boolean}
 */
export function isStaticCssImport(node) {
	return (
		node.type === 'ImportDeclaration' &&
		node.attributes?.length &&
		node.attributes.some(
			attributes =>
				attributes.key.name === 'type' && attributes.value.value === 'css',
		)
	);
}

/**
 * @example import('./styles.css', {with: { type: 'css' }});
 * @param {import('estree-walker').Node} node
 * @returns {boolean}
 */
export function isDynamicCssImport(node) {
	return (
		node.type === 'ImportExpression' &&
		node.attributes?.[0]?.properties?.[0]?.key?.name === 'with' &&
		node.attributes?.[0]?.properties?.[0]?.value?.properties?.[0]?.key.name ===
			'type' &&
		node.attributes?.[0]?.properties?.[0]?.value?.properties?.[0]?.value
			?.value === 'css'
	);
}

/**
 * @example import(`./foo-${i}.css`, { with: { type: 'css'} })
 * @param {import('estree-walker').Node} node
 * @returns {boolean}
 */
export function isTemplateStringWithVariables(node) {
	return (
		node.source.type === 'TemplateLiteral' && node.source?.quasis?.length > 1
	);
}

/**
 * @example import('./foo-' + i + '.css', { with: { type: 'css'} })
 * @param {import('estree-walker').Node} node
 * @returns {boolean}
 */
export function isBinaryExpression(node) {
	return node.source.type === 'BinaryExpression';
}
