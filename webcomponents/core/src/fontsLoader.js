import { loadFont } from '@trvt/assets';
const fontsLoader = (faceObject, localpath) => {
	const fontArray = Object.keys(faceObject).map((face) => faceObject[face]);
	fontArray.forEach((face) => loadFont(face, localpath));
};
export { fontsLoader };
