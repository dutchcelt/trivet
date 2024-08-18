/**
 * Append leading slash to path if it does not exist
 * @param {string} path
 * @returns {string}
 */
export const addLeadingSlash = path => (/^\//.test(path) ? path : `/${path}`);

/**
 * Dynamically load fonts.
 * Matches the settings used in the Design tokens (Style Dictionary).
 * @param {object} opts
 * @param {string} localpath
 * @returns {Promise<void>}
 */
export const loadFont = async (opts, localpath = '') => {
	let { family, filename, path, style, weight, display } = opts;
	const valid = Object.values(opts).some(f => typeof f === 'string');

	if (!valid || !family || !filename || !path) {
		throw new Error(
			'Missing font face information. Please check the token values.',
		);
	}

	path = addLeadingSlash(path);
	filename = addLeadingSlash(filename);

	const url = new URL(`${localpath + path}${filename}`, import.meta.url);

	if (!url) {
		throw new Error("Can't generate a URL");
	}

	const font = new FontFace(family, `url(${url})`, {
		style: style,
		weight: weight,
		display: display || 'auto',
	});

	await font.load();
	document.fonts.add(font);
};

/**
 * Loads fonts asynchronously from the given array or object of font faces.
 *
 * @param {Array|Object} faces - The array or object containing font faces to load.
 * @param {string} localpath - The local path to the font files.
 * @returns {undefined}
 */
export const fontsLoader = (faces, localpath) => {
	const facesArray = Array.isArray(faces)
		? faces
		: Object.keys(faces).map(face => faces[face]);
	facesArray.forEach(face => loadFont(face, localpath));
};
