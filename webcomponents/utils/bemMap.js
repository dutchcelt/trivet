
export default (bemObj, classes={}) => {
	const BE = [['', bemObj.block],['__', bemObj.element]]
		.map(([divider, bemName]) => bemName && divider + bemName);
	const bemArr = [BE.join('')];
	const modifiers = bemObj.modifier && new Set(
		Array.isArray(bemObj.modifier)
			? bemObj.modifier
			: bemObj.modifier.split(',')
	);
	modifiers && modifiers.forEach(M => M && bemArr.push(`${bemArr[0]  }--${  M.trim()}`));
	bemArr.filter(cls => cls).forEach(cls => classes[cls] = !!cls)
	return classes;
}
