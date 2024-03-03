// @ts-nocheck
import { loadFont } from '@trvt/assets';

/**
 * fontsLoader
 * @param {Array} faces - An array of fonts
 * @param {String} localpath - Where to load the fontfaces from
 */

/**
 * Loads fonts asynchronously from the given array or object of font faces.
 *
 * @param {Array|Object} faces - The array or object containing font faces to load.
 * @param {string} localpath - The local path to the font files.
 * @returns {undefined}
 */
const fontsLoader = (faces, localpath) => {
	const facesArray = Array.isArray(faces)
		? faces
		: Object.keys(faces).map(face => faces[face]);
	facesArray.forEach(face => loadFont(face, localpath));
};
export { fontsLoader };
