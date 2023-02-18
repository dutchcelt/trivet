/**
 * Dynamically load fonts.
 * Matches the settings used in the Design tokens (Style Dictionary).
 * @param opts
 * @param localpath
 * @returns {Promise<void>}
 */
export const loadFont = async (opts, localpath = '') => {
	let { family, filename, path, style, weight, display, variationSettings } =
		opts;
	const valid = Object.values(opts).some((f) => typeof f === 'string');
	if ((valid, !!filename, !!family, !!path)) {
		if (!/^\//.test(path)) path = `/${path}`;
		if (!/^\//.test(filename)) filename = `/${filename}`;
		const url = new URL(`${localpath + path}${filename}`, import.meta.url);
		if (url) {
			const font = new FontFace(family, `url(${url})`, {
				style: style,
				weight: weight,
				variationSettings: variationSettings || 'normal',
				display: display || 'auto',
			});
			await font.load();
			document.fonts.add(font);
		} else {
			new Error("Can't generate a URL");
		}
	} else {
		new Error(
			'Missing font face information. Please check the token values.'
		);
	}
};
