export const loadFont = async ({ family, filename, path, style, weight, display }) => {
	const valid = [family, filename, path, style, weight].some((f) => !!f.value && typeof f.value === 'string');
	if (valid) {
		const url = new URL(`${path.value}${filename.value}`, import.meta.url);
		if (url) {
			const font = new FontFace(family.value, `url(${url})`, {
				style: style.value,
				weight: weight.value,
				display: display.value || auto,
			});
			await font.load();
			document.fonts.add(font);
		} else {
			new Error("Can't generate a URL");
		}
	} else {
		new Error('Missing font face information. Please check the token values.');
	}
}
