import { loadFont } from '@trvt/assets';

/**
 * fontsLoader
 * @param {Array} faces - An array of fonts
 * @param {String} localpath - Where to load the fontfaces from
 */
const fontsLoader = (faces, localpath) => {
	const facesArray = Array.isArray(faces)
		? faces
		: Object.keys(faces).map(face => faces[face]);
	facesArray.forEach(face => loadFont(face, localpath));
};
export { fontsLoader };
