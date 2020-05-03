
export default (attrs,classes={}) => {
	const BE = [['', attrs.block],['__', attrs.element]]
		.map(([divider, bemName]) => bemName && divider + bemName);
	const BEM = [BE.join('')];
	const modifiers = new Set(
		Array.isArray(attrs.modifier)
			? attrs.modifier
			: attrs.modifier.split(',')
	);
	modifiers.forEach(M => M && BEM.push(BEM[0] + '--' + M.trim()));
	BEM.filter(cls => cls).forEach(cls => classes[cls] = !!cls)
	return classes;
}
