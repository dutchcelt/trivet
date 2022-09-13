import { loadFont } from '@trvt/assets';
const fontsLoader = (faces, localpath) => {
	const facesArray = Array.isArray(faces)
		? faces
		: Object.keys(faces).map((face) => faces[face]);
	facesArray.forEach((face) => loadFont(face, localpath));
};
export { fontsLoader };
