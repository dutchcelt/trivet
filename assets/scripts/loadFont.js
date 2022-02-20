export const loadFont = async ({ family, filename, path, style, weight, display }) => {
	const valid = [family, filename, path, style, weight].some((f) => !!f && typeof f === 'string');
	if ((path.value, path)) {
		const url = new URL(`${path}${filename}`, import.meta.url);
		if (url) {
			const font = new FontFace(family, `url(${url})`, {
				style: style,
				weight: weight,
				display: display || 'auto',
			});
			await font.load();
			document.fonts.add(font);
		} else {
			new Error("Can't generate a URL");
		}
	} else {
		new Error('Missing font face information. Please check the token values.');
	}
};
