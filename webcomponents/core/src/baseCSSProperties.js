/* eslint-disable no-unused-vars */
/* TODO: remove eslint-disable */

const trivetProps = [
	{
		name: 'display',
		value: 'block',
		syntax: 'block|none',
	},
	{
		name: 'position',
		value: 'static',
		syntax: 'static|relative|absolute|fixed|sticky',
	},
	{
		name: 'width',
		value: '100%',
		syntax: '<length>|<percent>)',
	},
	{
		name: 'height',
		value: 'auto',
		syntax: '<length>|<percentage>|auto)',
	},
];

function registerBaseProperties({ namespace, component, props }) {
	const properties = Object.assign({}, trivetProps, props);
	for (const prop of properties) {
		CSS.registerProperty({
			name: `--${namespace ?? 'trvt'}-${component ?? 'component'}-${prop.name}`,
			syntax: prop.syntax,
			inherits: false,
			initialValue: prop.value,
		});
	}
}
